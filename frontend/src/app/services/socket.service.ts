import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subject } from 'rxjs';
import * as io from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SocketService {
    private subject: Subject<MessageEvent>;
    private socket;

    constructor() { }

    public initSocket(): void {
        this.socket = io(environment.ws_url);
    }
    public send(socket, data: any): void {
        this.socket.emit(socket, data);
    }

    public onMessage(socket): Observable<any> {
        return new Observable<any>(observer => {
            this.socket.on(socket, (answer: any) => observer.next(answer));
        });
    }

    public onEvent(event: Event): Observable<any> {
        return new Observable<Event>(observer => {
            this.socket.on(event, () => observer.next());
        });
    }
}
