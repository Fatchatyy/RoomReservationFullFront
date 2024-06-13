import { Injectable} from '@angular/core';
import 'globals';

@Injectable({
  providedIn: 'root'
})

export class OneSignalService {

  /*async onLoad(): Promise<any> {
    window.OneSignal = window.OneSignal || [];
    return new Promise((resolve) => {
      window.OneSignal.push(function() {
        resolve(window.OneSignal);
      });
    });
  }


  constructor() { }
  onInit(): void {
   // throw new Error('Method not implemented.');
    this.onLoad().then((OneSignal)=>{
      OneSignal.init({
        appId: "cf945a42-ebe6-491f-8295-76238f7efdbb",
      });
    });
  }*/
  
}
