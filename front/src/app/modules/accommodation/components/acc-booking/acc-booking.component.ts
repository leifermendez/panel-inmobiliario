import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-acc-booking',
  templateUrl: './acc-booking.component.html',
  styleUrls: ['./acc-booking.component.scss']
})
export class AccBookingComponent implements OnInit {
  @Input() id: string
  @Input() data: any
  constructor() { }

  ngOnInit(): void {
  }

}
