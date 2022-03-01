import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-card-event',
  templateUrl: './card-event.component.html',
  styleUrls: ['./card-event.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardEventComponent implements OnInit {
  @Input() data: any
  constructor() { }

  ngOnInit(): void {
  }

}
