import { NgModule } from '@angular/core';
import { SpaceLaunchProgramsComponent } from './space-launch-programs.component';
import { SpaceService } from './space.service';
import { CommonModule } from '@angular/common';
import { routing } from './space-launch-programs.routing';


@NgModule({
  imports: [
    CommonModule,
    routing
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
