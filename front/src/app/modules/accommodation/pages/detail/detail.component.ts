import {Component, OnDestroy, OnInit} from '@angular/core';
import {faCheck, faTimes} from '@fortawesome/free-solid-svg-icons';
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons';
import {faAirbnb} from '@fortawesome/free-brands-svg-icons';
import {RestService} from "../../../../rest.service";
import {forkJoin, Observable, Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";
import {DocsService} from "../../../documents/docs.service";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  history = [
    {
      name: 'HISTORY.ACCOMMODATION'
    }, null
  ]
  faQuestionCircle = faQuestionCircle
  faCheck = faCheck
  faTimes = faTimes
  private callsHttp = [];
  listSubscribers: Subscription[] = []
  loading: boolean
  id: string;
  dataResponse: DataResponse

  constructor(private rest: RestService, private route: ActivatedRoute, private docsService: DocsService) {
  }

  ngOnInit(): void {
    this.listener$()
  }

  listener$ = () => {
    const observer1$ = this.route.params.subscribe(params => {
      this.callsHttp = []
      this.id = params?.id
      this.loading = true
      this.requestMultipleData(params?.id).subscribe(list => {
        this.loading = false;
        this.dataResponse = {
          accommodation: list[0],
          task: list[1],
          bookings: list[2],
          docs: list[3]
        }
        this.history[1] = {name: this.dataResponse.accommodation.name};
      }, error => this.loading = error);
    });

    this.listSubscribers.push(observer1$);
  }

  public requestMultipleData(dataIn: string | number): Observable<DataResponse[] | any> {
    this.callsHttp.push(this.rest.get(`accommodation/${dataIn}`))
    this.callsHttp.push(this.rest.get(`task?filter=${dataIn}&fields=accommodation`))
    this.callsHttp.push(this.rest.get(`booking?filter=${dataIn}&fields=accommodation`))
    this.callsHttp.push(this.rest.get(`documentation?filter=${dataIn}&fields=accommodation`))
    return forkJoin(this.callsHttp);
  }


  ngOnDestroy(): void {
    this.listSubscribers.forEach((subscription) => subscription.unsubscribe())
  }


}

export class DataResponse {
  accommodation: any;
  task: any;
  bookings: any;
  docs: any;
}
