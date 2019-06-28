import { Component, OnInit } from '@angular/core';
import { DomManipulatorService } from 'src/app/services/dom-manipulator.service';

@Component({
  selector: 'app-radar',
  templateUrl: './radar.component.html',
  styleUrls: ['./radar.component.scss']
})
export class RadarComponent implements OnInit {

  constructor(public domService: DomManipulatorService) { }

  ngOnInit() {
  }

}
