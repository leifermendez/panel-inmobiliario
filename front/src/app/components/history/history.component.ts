import {
  AfterContentChecked,
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import {faAngleRight, faAngleLeft} from '@fortawesome/free-solid-svg-icons';
import {HistoryPaginateService} from "./history-paginate.service";
import * as _ from 'lodash'
import {Pagination} from "../../models/Pagination.model";
import {PageChangedEvent} from "ngx-bootstrap/pagination";
import {$e} from "codelyzer/angular/styles/chars";
import {AccommodationService} from "../../modules/accommodation/accommodation.service";
import {TaskService} from "../../modules/task/task.service";
import {BookingService} from "../../modules/booking/booking.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit, AfterViewChecked {
  @Input() keySource: any
  @Input() history: any
  faAngleRight = faAngleRight
  faAngleLeft = faAngleLeft
  pagination: Pagination | any;

  constructor(private historyPaginateService: HistoryPaginateService,
              private cdRef: ChangeDetectorRef,
              private accommodationService: AccommodationService,
              private taskService: TaskService,
              private bookingService: BookingService,
              ) {
  }


  ngOnInit(): void {


  }

  getDataFormSource(source: string, key = 'data'): any {
    try {
      this.pagination = _.find(this.historyPaginateService.pagination, {key: source})[key];
      // console.log(this.pagination)
    } catch (e) {
      return null
    }
  }


  ngAfterViewChecked(): void {
    this.getDataFormSource(this.keySource)
    this.cdRef.detectChanges()
  }

  changePage($event: PageChangedEvent): void {
    // tslint:disable-next-line:no-eval
    eval(`this.${this.keySource}Service`).reloadPaginate($event.page);
  }
}
