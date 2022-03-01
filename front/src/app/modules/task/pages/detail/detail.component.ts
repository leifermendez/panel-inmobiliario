import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import * as moment from 'moment';
import {RestService} from "../../../../rest.service";
import {faFileWord, faFilePdf, faFileExcel, faFile} from '@fortawesome/free-regular-svg-icons';
import {Task} from "../../../../models/Task.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy {
  now: any;
  history = [
    {
      name: 'HISTORY.TASK'
    }, null
  ]
  idAccommodation: string;
  idTask: string;
  fileType: string;
  data$: Task;
  faFileWord = faFileWord
  faFilePdf = faFilePdf
  faFileExcel = faFileExcel
  public loading: boolean;
  public loadingSending: boolean;
  listSubscribers: Subscription[] = []
  public newTask: boolean
  public form: FormGroup;

  constructor(private route: ActivatedRoute, private rest: RestService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.now = moment().toDate()
    this.listener$()
    this.form = this.formBuilder.group({
      observation: ['', Validators.required]
    });

  }

  listener$ = () => {
    const observer1$ = this.route.params.subscribe(params => {
      this.idAccommodation = params?.accommodation;
      const {id = null} = params;
      this.idTask = id
      this.newTask = (id === 'new');
      if (!this.newTask) {
        this.loadData()
      }
    });
    this.listSubscribers.push(observer1$);
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`task/${this.idTask}`).subscribe(res => {
      this.data$ = res;
      this.loading = false
      this.history[1] = {name: this.data$.title};
    }, error => this.loading = error)
  }

  send = () => {
    this.loadingSending = true
    this.rest.post(`/comments/${this.idTask}`, this.form.value).subscribe(res => {
      this.form.reset()
      this.loadingSending = false
      this.data$ = {...this.data$, ...{comments: res.comments}};
    }, err => this.loadingSending = err)
  }

  ngOnDestroy(): void {
    this.listSubscribers.forEach((subscription) => subscription.unsubscribe())
  }

}
