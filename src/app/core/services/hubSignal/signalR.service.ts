import { BaseService } from './../base/base.service';
import { Injectable } from '@angular/core';
import  * as SignalR from '@microsoft/signalr';
@Injectable({
  providedIn: 'root'
})
export class SignalRService {

constructor(private baseService:BaseService) { }

  hubConnection:SignalR.HubConnection;

  startConnection =() =>{
    this.hubConnection = new SignalR.HubConnectionBuilder()
    .withUrl(this.baseService.apiUrl+'/notify',{
      skipNegotiation:true,
      transport: SignalR.HttpTransportType.WebSockets
    }).build();

    this.hubConnection.start()
    .then(()=>{
      console.log("hub connection started");
    }).catch(err => console.log(err));
  }

  askServer(){
    this.hubConnection.invoke("askServer","hey")
    .catch(err => console.error(err));
  }

  askServerListener(){
    this.hubConnection.on("askServerResponse",(someText)=>{
      console.log(someText);
    });
  }

}
