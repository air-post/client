import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map';

import { LocalDataService } from '../providers/local-data-service';

@Injectable()
export class UserDataService {
  public url_login = "http://54.234.5.125/api/login";

  constructor(public http: Http, private localDataService: LocalDataService) {}

  login(userName, password, loginType) {
    let token = "qvfDtLoRfvmtK9F3mPWeL7zk";
    this.localDataService.setUserToken(token);
  }

}
