import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import * as io from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WebsocketService {
    private subject: Subject<MessageEvent>;
    private socket;
    constructor(private http: HttpClient
    ) { }

    connect(): Subject<MessageEvent> {
        this.socket = io(environment.ws_url);
        const observable = new Observable((observer) => {
            this.socket.on("message", (data) => {
                console.log("Received a message from websocket server");
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        const observer = {
            next: (data: Object) => {
                this.socket.emit("message", JSON.stringify(data));
            }
        };
        return Subject.create(observer, observable);
    }
}
