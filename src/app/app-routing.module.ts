import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SpaceLaunchProgramsComponent } from './space-launch-programs/space-launch-programs.component';

const routes: Routes = [
  { path: '', redirectTo: '/space-launch-programs', pathMatch: 'full' },
  { path: 'space-launch-programs', component: SpaceLaunchProgramsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
