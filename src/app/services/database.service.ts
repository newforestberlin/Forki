import { Injectable } from '@angular/core';
import { Grid, BiAStarFinder, BiBDijstraFinder, BiBestFirstFinder } from 'pathfinding';
import * as $ from 'jquery';
import { HttpClient } from "@angular/common/http";

interface Coordinate {
    x: number;
    y: number
}
@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    constructor(private http: HttpClient
    ) { }
    getPath(height, width, elementSize, clearance) {
        return new Promise((resolve) => {
            this.http.get<any[]>("http://localhost:3000/getpath/" + height + "/" + width + "/" + elementSize + "/" + clearance)
                .subscribe(path => {
                    resolve(path);
                });
        });
    }
    getRobotPosition() {
        return new Promise((resolve) => {
            this.http.get<any[]>("http://localhost:3000/robotposition")
                .subscribe(start => {
                    resolve(start);
                });
        });
    }

    getTargetPosition() {
        return new Promise((resolve) => {
            this.http.get<any[]>("http://localhost:3000/targetposition")
                .subscribe(targetPosition => {
                    resolve(targetPosition);
                });
        });
    }

    getObservablePosition() {
        return new Promise((resolve) => {
            this.http.get<any[]>("http://localhost:3000/observableposition")
                .subscribe(observablesParameter => {
                    resolve(observablesParameter);
                });
        });
    }

    setTargetPosition(targetPosition) {
        return new Promise((resolve) => {
            this.http.post("http://localhost:3000/observableposition", targetPosition)
                .subscribe(targetPosition => {
                    resolve(targetPosition);
                });
        });
    }

    setObservablePosition(observablesParameter) {
        return new Promise((resolve) => {
            this.http.post("http://localhost:3000/observableposition", observablesParameter)
                .subscribe(observablesParameter => {
                    resolve(observablesParameter);
                });
        });
    }
}

