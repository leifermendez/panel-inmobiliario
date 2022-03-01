import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ModalDocsService} from "../../../documents/components/modal-form/modal-docs.service";
import * as _ from 'lodash'

@Component({
  selector: 'app-acc-docs',
  templateUrl: './acc-docs.component.html',
  styleUrls: ['./acc-docs.component.scss']
})
export class AccDocsComponent implements OnInit, OnDestroy {
  @Input() id: string
  @Input() data: any
  listSubscribers: Subscription[] = []

  constructor(private modalDocs: ModalDocsService) {
  }

  ngOnInit(): void {
    this.listener$()
  }

  listener$ = () => {
    const observer1$ = this.modalDocs.result.subscribe(res => {
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
