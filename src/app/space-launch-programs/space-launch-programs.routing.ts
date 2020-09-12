/**
 * Created by kuldeep on 4/4/17.
 */

import {Routes, RouterModule} from '@angular/router';
import { SpaceLaunchProgramsComponent } from './space-launch-programs.component';

const routes: Routes = [
    {
        path: '',
        component: SpaceLaunchProgramsComponent,
    }
];

export const routing = RouterModule.forChild(routes);