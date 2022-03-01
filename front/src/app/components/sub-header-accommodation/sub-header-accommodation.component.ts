import {Component, Input, OnInit} from '@angular/core';
import {Accommodation} from "../../models/Accommodation.model";

@Component({
  selector: 'app-sub-header-accommodation',
  templateUrl: './sub-header-accommodation.component.html',
  styleUrls: ['./sub-header-accommodation.component.scss']
})
export class SubHeaderAccommodationComponent implements OnInit {
  @Input() data: Accommodation

  constructor() {
  }

  ngOnInit(): void {
  }

}
