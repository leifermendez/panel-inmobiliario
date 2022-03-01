import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {
  faClipboard, faCalendarCheck, faFileAlt, faFolderOpen, faQuestionCircle, faChartBar,
  faBuilding
} from '@fortawesome/free-regular-svg-icons';
import {DocsService} from "../../modules/documents/docs.service";
import {Subscription} from "rxjs";
import {ModalDocsService} from "../../modules/documents/components/modal-form/modal-docs.service";
import * as _ from 'lodash'

@Component({
  selector: 'app-dashboard-docs',
  templateUrl: './dashboard-docs.component.html',
  styleUrls: ['./dashboard-docs.component.scss']
})
export class DashboardDocsComponent implements OnInit, OnDestroy {
  @Input() data: any
  listSubscribers: Subscription[] = []
  faClipboard = faClipboard

  constructor(private modalDocsService: ModalDocsService) {
  }

  ngOnInit(): void {
    this.listener$()
  }

  listener$ = () => {
    const observer1$ = this.modalDocsService.result.subscribe(res => {
      this.data.docs = _.map(this.data.docs, (r => {
        r.values = (r?._id === res?._id) ? res.values : r.values
        r.percentage = (r?._id === res?._id) ? res.percentage : r.percentage
        return r;
      }));
    })
    this.listSubscribers.push(observer1$);
  }


  ngOnDestroy(): void {
    this.listSubscribers.forEach((subscription) => subscription.unsubscribe())
  }
}
