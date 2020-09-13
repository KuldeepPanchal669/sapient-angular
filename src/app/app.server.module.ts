import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule,
    BrowserModule.withServerTransition({ appId: 'sapient-angular'  })
  ],
  providers: [
    // Add server-only providers here.
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
