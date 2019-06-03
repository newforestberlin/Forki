import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
})
export class DatabaseService {
    id = 1;
    constructor(private http: HttpClient
    ) { }
    getPath(width, height, elementSize, clearance) {
        return new Promise((resolve) => {
            const id = 1;
            this.http.get<any[]>("http://localhost:3000/getpath/" + id + "/" + width + "/" + height + "/" + elementSize + "/" + clearance)
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

    getObstacleParameters() {
        return new Promise((resolve) => {
            this.http.get<any[]>("http://localhost:3000/obstacleparameters")
                .subscribe(obstacleParameter => {
                    resolve(obstacleParameter);
                });
        });
    }

    setRobotPosition(robotPosition) {
        return new Promise((resolve) => {
            this.http.post("http://localhost:3000/robotupdate", { id: this.id, x: robotPosition.x, y: robotPosition.y })
                .subscribe(setRobotPosition => {
                    resolve(setRobotPosition);
                });
        });
    }

    setObstacleParameters(obstacleParameters) {
        return new Promise((resolve) => {
            this.http.post("http://localhost:3000/obstacleupdate", { id: this.id, obstacleParameters: obstacleParameters })
                .subscribe(setObservablesParameters => {
                    resolve(setObservablesParameters);
                });
        });
    }

    setTargetPosition(targetPosition) {
        return new Promise((resolve) => {
            this.http.post("http://localhost:3000/targetupdate", { id: this.id, x: targetPosition.x, y: targetPosition.y })
                .subscribe(setTargetPosition => {
                    resolve(setTargetPosition);
                });
        });
    }


}

