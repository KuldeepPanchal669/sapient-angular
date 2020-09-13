import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { SpaceService } from './space.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { isPlatformServer, isPlatformBrowser } from '@angular/common';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

const SP: any = makeStateKey<{}>("SP"); // SP : Space Programs
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
    isBrowser: boolean;
    isServer: boolean;

    constructor(@Inject(PLATFORM_ID) platformId, private _tState: TransferState, private _activatedRoute: ActivatedRoute, private _router: Router, private spaceService: SpaceService) {
        this.isServer = isPlatformServer(platformId);
        this.isBrowser = isPlatformBrowser(platformId);
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
            this.filter = this.updateFilters(queryParams);
            if (this._tState.hasKey(SP)) {
                this.initilizeData(this._tState.get(SP, []));
            } else {
                this.getSpacePrograms(queryParams)
                    .pipe(
                        catchError((err) => {
                            return of([]);
                        })
                    )
                    .subscribe((spacePrograms) => {
                        if (this.isServer) {
                            this._tState.set(SP, spacePrograms);
                        }
                        this.initilizeData(spacePrograms);
                    });
            }
        })
    }

    ngOnInit() {

    }

    ngAfterViewInit()
    {
        /*Remove key set on server side to avoid api on dom load of frontend side*/
        if (this.isBrowser) {
            this._tState.remove(SP);
        }
    }

    getSpacePrograms(queryParams): Observable<Array<{}>> {
        return this.spaceService.getSpaceProgramsApi({ ...{ "limit": 100 }, ...queryParams });
    }

    initilizeData(spacePrograms) {
        this.spacePrograms = spacePrograms;
    }

    navigateTo(type, param) {
        const queryParams = { ...this._activatedRoute.snapshot.queryParams };
        if (queryParams[type] != undefined) {
            if (queryParams[type] == param + "") {
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
        filter['successfullLaunch'] = queryParams['launch_success'] != undefined ? queryParams['launch_success'] : null;
        filter['successfullLand'] = queryParams['land_success'] != undefined ? queryParams['land_success'] : null;
        return filter;
    }
}
