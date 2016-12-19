import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions, Response } from "@angular/http";
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/Rx';

import { AirPost } from '../models/air-post-model';
import { LocalDataService } from '../providers/local-data-service';

@Injectable()
export class AirPostDataService {
  private url_list = 'http://54.234.5.125/api/posts';
  private url_details = 'http://54.234.5.125/api/post';

  constructor(private http: Http, private localDataService: LocalDataService)
  {
  }

  getAirPosts(latitude, longitude, distance, uid): Observable<AirPost[]> {
    let listUrl = this.url_list + '?latitude=' + latitude + '&longitude=' + longitude + '&distance=' + distance;
    if (uid != null || uid != undefined) {
      listUrl += ('&user_id=' + uid);
    }
    let headers = new Headers({ 'Authorization': 'Token token=' + this.localDataService.getUserToken() });
    return this.http.get(listUrl, { headers: headers }).map((resp: Response) => resp.json().data);
  }

  getAirPostDetails(id): Observable<AirPost> {
    let detailsUrl = this.url_details + '/' + id;
    let headers = new Headers({ 'Authorization': 'Token token=' + this.localDataService.getUserToken() });
    return this.http.get(detailsUrl, { headers: headers }).map((resp: Response) => resp.json().data);
  }

  createAirPost(title, content, latitude, longitude, accuracy) {
    let body = JSON.stringify({
      title: title,
      content: content,
      latitude: latitude,
      longitude: longitude,
      accuracy : accuracy
    });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token token=' + this.localDataService.getUserToken());
    let options = new RequestOptions({ headers: headers });

    this.http
        .post(this.url_list, body, options)
        .map(res => res.json())
        .subscribe(
          data => {
            console.log(data);
          },
          err => {
            console.log("ERROR: " + err);
          }
        )
  }

}
