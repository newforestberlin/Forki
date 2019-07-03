import { Component, OnInit } from '@angular/core';
import { DomManipulatorService } from 'src/app/services/dom-manipulator.service';

@Component({
  selector: 'app-sonar',
  templateUrl: './sonar.component.html',
  styleUrls: ['./sonar.component.scss']
})
export class SonarComponent implements OnInit {

  constructor(public domService: DomManipulatorService) { }

  ngOnInit() {
    setInterval(() => {
      // this.domService.rotateSweep(45);
    }, 1000);
  }

}
