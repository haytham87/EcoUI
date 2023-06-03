
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '../../models/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  config: Config;

  
  constructor(private http: HttpClient) { }

  loadConfig() {
    return this.http
      .get<Config>('./assets/config/config.json')
      .toPromise()
      .then(config => {
        this.config = config;
      });
  }

  loadToken(){
    return this.http
      .get<Config>('./assets/config/config.json')
      .toPromise()
      .then(config => {
        this.config.token = config.token;
      });
  }
  
  // load() {

  //   const jsonFile = `./assets/config.json`;

  //   return new Promise<void>((resolve, reject) => {
  //     this.http.get(jsonFile).toPromise<void>().then((response: Config) => {
  //       this.config = <Config>response;
  //       console.log('Config Loaded');
  //       resolve();
  //     }).catch((response: any) => {
  //       reject(`Could not load the config file`);
  //     });
  //   });
  // }


}

