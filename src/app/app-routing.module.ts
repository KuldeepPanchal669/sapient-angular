import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/space-launch-programs', pathMatch: 'full' },
  { path: 'space-launch-programs', loadChildren: () => import('./space-launch-programs/space-launch-programs.module').then(m => m.SpaceLaunchProgramsModule)},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
