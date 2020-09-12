import { NgModule } from '@angular/core';
import { SpaceLaunchProgramsComponent } from './space-launch-programs.component';
import { SpaceService } from './space.service';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SpaceLaunchProgramsComponent,
  ],
  providers: [
    SpaceService
  ]
})
export class SpaceLaunchProgramsModule {
  
}
