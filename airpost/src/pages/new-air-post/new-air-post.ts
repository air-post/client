import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";

import { Device } from 'ionic-native';
import { Geolocation } from 'ionic-native';
import { NavController } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';

import { AirPostDataService } from '../../providers/air-post-data-service';

@Component({
  selector: 'page-new-air-post',
  templateUrl: 'new-air-post.html'
})
export class NewAirPostPage implements OnInit  {
  public airPostForm: FormGroup;
  private latitude: number;
  private longitude: number;
  private uuid: string;

  constructor(
    public navCtrl: NavController,
    private airPostService: AirPostDataService,
    private formBuilder: FormBuilder
  ) {
    //this.uuid = Device.device.uuid;
    this.airPostForm = this.formBuilder.group({
      'title': ['', [Validators.required, Validators.maxLength(50)]],
      'content': ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    Geolocation.getCurrentPosition().then((resp) => {
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log('latitude: ' + this.latitude);
      console.log('longitude: ' + this.longitude);
      //console.log('uuid: ' + this.uuid);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  onSubmit(formData){
    if (formData.valid){
      console.log('title: ' + formData.controls.title.value);
      console.log('content: ' + formData.controls.content.value);
      console.log('latitude: ' + this.latitude);
      console.log('longitude: ' + this.longitude);
      this.airPostService.createAirPost(formData.controls.title.value, formData.controls.content.value, this.latitude, this.longitude, 1);
      this.navCtrl.pop();
    }

  }

}
