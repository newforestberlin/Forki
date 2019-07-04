import { Component, OnInit } from '@angular/core';
import { DomManipulatorService } from 'src/app/services/dom-manipulator.service';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-sonar',
  templateUrl: './sonar.component.html',
  styleUrls: ['./sonar.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SonarComponent implements OnInit {

  constructor(public domService: DomManipulatorService) { }

  ngOnInit() {
    setInterval(() => {
      // this.domService.rotateSweep(45);
    }, 1000);
  }

}
