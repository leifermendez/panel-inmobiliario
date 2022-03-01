import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import * as vivus from 'vivus';
import {map} from "rxjs/operators";
import {RestService} from "../../../../rest.service";
import {Observable, Subscription} from "rxjs";
import {HistoryPaginateService} from "../../../../components/history/history-paginate.service";
import {AccommodationService} from "../../../accommodation/accommodation.service";
import {TaskService} from "../../task.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  history = [
    {
      name: 'HISTORY.TASKS'
    }
  ]
  loading: boolean;
  public data: any;
  listSubscribers: Subscription[] = []
  readonly source = 'task'

  constructor(private rest: RestService, private historyPaginateService: HistoryPaginateService,
              private taskService: TaskService) {
  }

  ngOnInit(): void {
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
    const observer1$ = this.taskService.result.subscribe(res => this.loadData(res))
    this.listSubscribers.push(observer1$);
  }

}
