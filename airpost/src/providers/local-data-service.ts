import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalDataService {

  constructor(private storage: Storage) {
  }

  getValue(key) {
    return this.storage.get(key);
  }

  setValue(key, value) {
    this.storage.set(key, value);
  }

  removeValue(key) {
    this.storage.remove(key);
  }

  getUserToken()
  {
    let token = "qvfDtLoRfvmtK9F3mPWeL7zk";
    return token;
    //return this.storage.get('token');
  }

  setUserToken(token)
  {
    this.storage.set('token', token);
  }
}
