import { Component, OnInit } from '@angular/core';

import { Device } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import { NavController, ModalController, Refresher } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import { AirPostDataService } from '../../providers/air-post-data-service';
import { AirPost } from '../../models/air-post-model';
import { AirPostDetailPage } from '../air-post-detail/air-post-detail';
import { NewAirPostPage } from '../new-air-post/new-air-post';

@Component({
  selector: 'page-air-post',
  templateUrl: 'air-post.html'
})
export class AirPostPage implements OnInit {
  public posts: AirPost[] = [];
  private latitude: number;
  private longitude: number;
  private distance: number = 5500000;
  private uuid: string;
  private uid: number;
  public loading: boolean;

  constructor(
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    private airPostService: AirPostDataService
  ) {
    //this.uuid = Device.device.uuid;
  }

  ngOnInit(): void {
    this.loading = true;
    Geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log('latitude: ' + this.latitude);
      console.log('longitude: ' + this.longitude);
      //console.log('uuid: ' + this.uuid);
      const subscription = this.airPostService
                               .getAirPosts(this.latitude, this.longitude, this.distance, this.uid)
                               .subscribe(airPosts => {
                                  this.posts = airPosts;
                                  this.loading = false;
                                  subscription.unsubscribe();
                                }, () => this.loading = false);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  doRefresh(refresher: Refresher) {
    const subscription = this.airPostService
                             .getAirPosts(this.latitude, this.longitude, this.distance, this.uid)
                             .subscribe(airPosts => {
                                this.posts = airPosts;
                                refresher.complete();
                                subscription.unsubscribe();
                              }, () => refresher.complete());
  }

  details(id: number) {
    let modal = this.modalCtrl.create(AirPostDetailPage, {id: id});
    modal.present();
  }

  newPost() {
    this.navCtrl.push(NewAirPostPage, {});
  }

}
