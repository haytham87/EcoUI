import { Injectable } from "@angular/core";
import { Resolve } from "@angular/router";
import { ScreenService } from "../../services/sc/screen.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
  export class ScreensResolver implements Resolve<any> {
    constructor(
      private service: ScreenService
    ) { }
    resolve(): Observable<any> {
      return this.service.getAllScreens();
    }
  }