import {Component, Input, OnInit} from '@angular/core';
import {faStar} from '@fortawesome/free-solid-svg-icons';
import {faAirbnb} from '@fortawesome/free-brands-svg-icons';
import {environment} from "../../../environments/environment";
import {Accommodation} from "../../models/Accommodation.model";

@Component({
  selector: 'app-card-accommodation',
  templateUrl: './card-accommodation.component.html',
  styleUrls: ['./card-accommodation.component.scss']
})
export class CardAccommodationComponent implements OnInit {
  @Input() data: Accommodation
  faAirbnb = faAirbnb
  faStar = faStar
  public readonly mapBox = environment.mapbox

  constructor() {
  }

  ngOnInit(): void {
    console.log()
  }


}
