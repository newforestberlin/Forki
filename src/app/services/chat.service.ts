import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import * as io from "socket.io-client";
import { environment } from 'src/environments/environment';
import { WebsocketService } from './websocket.service';

@Injectable({
    providedIn: 'root'
})
export class ChatService {

    messages: Subject<any>;

    constructor(private http: HttpClient, private wsService: WebsocketService
    ) {
        this.messages = <Subject<any>>wsService
            .connect().pipe(
                map((response: any): any => {
                    return response;
                }))
    }

    sendMsg(msg) {
        this.messages.next(msg);
    }
}

