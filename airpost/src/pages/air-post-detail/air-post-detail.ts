import { Component, OnInit } from '@angular/core';

import { Device } from 'ionic-native';
import { NavParams, ViewController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import { AirPostDataService } from '../../providers/air-post-data-service';
import { AirPost } from '../../models/air-post-model';

@Component({
  selector: 'page-air-post-detail',
  templateUrl: 'air-post-detail.html'
})
export class AirPostDetailPage implements OnInit {
  public post: AirPost;
  private uuid: string;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private airPostService: AirPostDataService
  ) {}

  ngOnInit() {
    //this.uuid = Device.device.uuid;
    this.airPostService.getAirPostDetails(this.navParams.get('id')).subscribe((airPost: AirPost) => {this.post = airPost;});
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
