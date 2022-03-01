import {Component, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {RestService} from "../../../../rest.service";
import {map, pluck, take} from "rxjs/operators";
import {forkJoin, Observable, Subscription} from "rxjs";
import {HistoryPaginateService} from "../../../../components/history/history-paginate.service";
import {AccommodationService} from "../../accommodation.service";
import {ColumnMode} from '@swimlane/ngx-datatable'
import {faFile} from '@fortawesome/free-regular-svg-icons';
import {DocsService} from "../../../documents/docs.service";
import {DataResponse} from "../detail/detail.component";
import {AuthInterceptorService} from "../../../../auth-interceptor.service";
import {OauthService} from "../../../../oauth.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @ViewChild('myTable') table: any;
  @ViewChild('hdrTpl', {static: true}) hdrTpl: TemplateRef<any>;
  @ViewChild('nameTpl', {static: true}) nameTpl: TemplateRef<any>;
  @ViewChild('addressTpl', {static: true}) addressTpl: TemplateRef<any>;
  public docsDetail$ = []
  public loadingDocsDetail$ = []
  faFile = faFile
  modeView: string

  constructor(private rest: RestService, private auth: OauthService,
              private historyPaginateService: HistoryPaginateService,
              private accommodationService: AccommodationService, private docsService: DocsService) {
  }

  history = [
    {
      name: 'HISTORY.ACCOMMODATION'
    }
  ]
  data: any;
  loading: boolean;
  listSubscribers: Subscription[] = []
  readonly source = 'accommodation'
  columns = [];
  private callsHttp = [];
  ColumnMode = ColumnMode;

  ngOnInit(): void {
    this.modeView = (this.auth.getCurrentUser().role === 'admin') ? 'admin' : 'user'
    this.listener$()
    this.loadData();
  }

  loadData = (page = 1) => {
    this.loading = true;
    this.rest.get(`${this.source}?page=${page}&limit=18`).pipe(
      map((b: any) => {
        this.historyPaginateService.setter(this.source, b);
        return b;
      }),
      map((b: any) => b.docs)
    ).subscribe(res => {
      this.data = res;
      this.loading = false
    }, err => this.loading = err);
  }

  listener$ = () => {
    const observer1$ = this.accommodationService.result.subscribe(res => this.loadData(res))
    this.listSubscribers.push(observer1$);
  }


  toggleExpandRow(row): void {
    this.getLoadDocs(row?._id)
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle($event: any): void {
    // console.log($event)
  }

  getLoadDocs(id: string): any {
    this.loadingDocsDetail$[id] = true
    this.requestMultipleData(id).subscribe(list => {
      this.docsDetail$[id] = list;
      this.loadingDocsDetail$[id] = false
    })
  }

  openModal = (data: any) => {
    if (data !== undefined) {
      this.docsService.callForm(data);
    }
  }

  public requestMultipleData(dataIn: string | number): Observable<DataResponse[] | any> {
    this.callsHttp = []
    this.callsHttp.push(this.rest.get(`documentation?filter=${dataIn}&fields=accommodation&limit=100`)
      .pipe(map((a: any) => a.docs)))
    // this.callsHttp.push(this.rest.get(`accommodation/${dataIn}`))
    // this.callsHttp.push(this.rest.get(`task?filter=${dataIn}&fields=accommodation`))
    // this.callsHttp.push(this.rest.get(`booking?filter=${dataIn}&fields=accommodation`))
    return forkJoin(this.callsHttp);
  }
}
