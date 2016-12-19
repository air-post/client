import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AirPostPage } from '../pages/air-post/air-post';
import { AirPostDetailPage } from '../pages/air-post-detail/air-post-detail';
import { NewAirPostPage } from '../pages/new-air-post/new-air-post';

import { AirPostDataService } from '../providers/air-post-data-service';
import { LocalDataService } from '../providers/local-data-service';
import { UserDataService } from '../providers/user-data-service';

@NgModule({
  declarations: [
    MyApp,
    AirPostPage,
    AirPostDetailPage,
    NewAirPostPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AirPostPage,
    AirPostDetailPage,
    NewAirPostPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, AirPostDataService, LocalDataService, UserDataService]
})
export class AppModule {}
