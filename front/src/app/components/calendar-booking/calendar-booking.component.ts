import {Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef, ViewChild} from '@angular/core';
import {Subject} from 'rxjs';
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import {
  startOfDay, endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  parseISO,
  addHours,
} from 'date-fns';
import {RestService} from "../../rest.service";
import {map} from "rxjs/operators";
import * as moment from "moment";
import {Router} from "@angular/router";


@Component({
  selector: 'app-calendar-booking',
  templateUrl: './calendar-booking.component.html',
  styleUrls: ['./calendar-booking.component.scss']
})

export class CalendarBookingComponent implements OnInit, OnChanges {
  @Input() data: any
  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;
  const

  view: CalendarView = CalendarView.Month;

  viewDate: Date = new Date();
  faAngleLeft = faAngleLeft
  faAngleRight = faAngleRight

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = []

  activeDayIsOpen = false;

  constructor(private router: Router) {

  }


  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd,
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent | any): void {
    // @ts-ignore
    if (event.behavior?.mode === 'router') {
      console.log(event.behavior?.router.split('/'))
      this.router.navigate(event.behavior?.router.split('/'))
    }
  }

  // tslint:disable-next-line:typedef
  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  ngOnInit(): void {
    this.events = this.data
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.events = changes.data.currentValue
  }


}
