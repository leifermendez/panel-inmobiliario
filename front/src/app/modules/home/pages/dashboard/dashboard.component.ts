import {Component, OnDestroy, OnInit} from '@angular/core';
import {forkJoin, Observable, Subscription} from "rxjs";
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons';
import {RestService} from "../../../../rest.service";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import * as moment from "moment";
import {ModalRequestService} from "../../../../components/modal-request/modal-request.service";
import {DashboardService} from "./dashboard.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  history = [
    {
      name: 'HISTORY.DASHBOARD'
    }
  ]
  faQuestionCircle = faQuestionCircle
  faCheck = faCheck
  faTimes = faTimes
  private callsHttp = [];
  listSubscribers: Subscription[] = []
  loading: boolean
  dataResponse: DataResponse

  constructor(private rest: RestService, private route: ActivatedRoute,
              private modalRequestService: ModalRequestService, private dashboardService: DashboardService) {
    this.listener$()
  }

  ngOnInit(): void {
    this.loadData()
  }

  listener$ = () => {
    const observer1$ = this.modalRequestService.result.subscribe(r => this.loadData())
    this.listSubscribers.push(observer1$)
  }

  loadData = () => {
    this.callsHttp = []
    this.loading = true
    this.requestMultipleData().subscribe(list => {
      this.loading = false;
      this.dataResponse = {
        calendar: list[0],
        events: list[1],
        docs: list[2]
      }
    }, error => this.loading = error);
  }


  public requestMultipleData(): Observable<DataResponse[] | any> {
    this.callsHttp.push(this.rest.get(`events`).pipe(
      map(a => a.docs),
      map(prevData => {
        return prevData.map((b: { start: number | Date; end: number | Date; color: string; actions: any }) => {
          b.start = moment(b.start).toDate();
          b.end = moment(b.end).toDate();
          b.color = this.dashboardService.colors[b.color];
          return b;
        });
      })
    ))

    this.callsHttp.push(this.rest.get(`events`))
    this.callsHttp.push(this.rest.get(`documentation`))
    return forkJoin(this.callsHttp);
  }

  ngOnDestroy(): void {
    this.listSubscribers.forEach((subscription) => subscription.unsubscribe())
  }

}

export class DataResponse {
  calendar: any;
  events: any;
  docs: any;
}
