import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {RestService} from "../../../../rest.service";
import {FormBuilder} from "@angular/forms";
import {Subscription} from "rxjs";
import {BookingModel} from "../../../../models/Booking.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  history = [
    {
      name: 'HISTORY.BOOKING'
    }, null
  ]
  panels: any = []
  listSubscribers: Subscription[] = []
  idAccommodation: string;
  idTask: string;
  public loading: boolean;
  data$: BookingModel;

  constructor(private route: ActivatedRoute, private rest: RestService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.listener$()
  }

  listener$ = () => {
    const observer1$ = this.route.params.subscribe(params => {
      this.idAccommodation = params?.accommodation;
      const {id = null} = params;
      this.idTask = id
      this.loadData()
    });
    this.listSubscribers.push(observer1$);
  }

  loadData = () => {
    this.loading = true;
    this.rest.get(`booking/${this.idTask}`).subscribe(res => {
      this.data$ = res;
      this.history[1] = {name: this.data$.localizator}
      this.loading = false
    }, error => this.loading = error)
  }

  ngOnDestroy(): void {
    this.listSubscribers.forEach((subscription) => subscription.unsubscribe())
  }

}
