import {Component, Input, OnInit} from '@angular/core';
import {faUser, faCalendarAlt, faCalendarCheck} from '@fortawesome/free-regular-svg-icons';
import {faGlobeAmericas, faLanguage} from '@fortawesome/free-solid-svg-icons';
import {BookingModel} from "../../models/Booking.model";

@Component({
  selector: 'app-card-booking',
  templateUrl: './card-booking.component.html',
  styleUrls: ['./card-booking.component.scss']
})
export class CardBookingComponent implements OnInit {
  @Input() data: BookingModel
  faUser = faUser
  faGlobeAmericas = faGlobeAmericas
  faLanguage = faLanguage
  faCalendarCheck = faCalendarCheck
  faCalendarAlt = faCalendarAlt

  constructor() {
  }

  ngOnInit(): void {
  }

}
