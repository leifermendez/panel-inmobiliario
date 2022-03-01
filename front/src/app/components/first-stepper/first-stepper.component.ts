import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {NotificationsService} from "../../notifications.service";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-first-stepper',
  templateUrl: './first-stepper.component.html',
  styleUrls: ['./first-stepper.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('150ms', style({transform: 'translateY(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('150ms', style({transform: 'translateY(100%)', opacity: 0}))
        ])
      ]
    )
  ],
  encapsulation: ViewEncapsulation.None,
})
export class FirstStepperComponent implements OnInit {
  faCheck = faCheck

  constructor(public notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
    this.notificationsService.loadData()
  }

}
