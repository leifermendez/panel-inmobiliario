import {AfterViewChecked, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {BsDatepickerConfig} from "ngx-bootstrap/datepicker";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {RestService} from "../../rest.service";
import {DashboardService} from "../../modules/home/pages/dashboard/dashboard.service";
import {ModalRequestService} from "./modal-request.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-modal-request',
  templateUrl: './modal-request.component.html',
  styleUrls: ['./modal-request.component.scss']
})
export class ModalRequestComponent implements OnInit, AfterViewChecked {
  public initData: any
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  maxDate = new Date();
  public formCall: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;
  minTime: Date = new Date();
  loading: boolean
  send: string | boolean = false
  date: any;
  time: any;
  accommodations$: any
  selectAccommodation: any;

  constructor(private formBuilder: FormBuilder, public bsModalRef: BsModalRef, private rest: RestService,
              private modalRequestService: ModalRequestService,
              private cdRef: ChangeDetectorRef) {
    this.bsConfig = Object.assign({}, {containerClass: 'theme-default'});
    this.maxDate.setDate(this.maxDate.getDate() + 7);
    this.bsInlineRangeValue = [this.bsInlineValue, this.maxDate];


  }

  seTimeNextRound = () => {
    const m = moment();
    const roundUp = m.minute() || m.second() || m.millisecond() ? m.add(1, 'hour')
      .startOf('hour') : m.startOf('hour');
    this.minTime.setHours(Number(roundUp.format('HH')));
    this.minTime.setMinutes(Number(roundUp.format('MM')));
    this.time = roundUp.toDate()
  }

  ngOnInit(): void {
    this.formCall = this.formBuilder.group({
      date: ['', [Validators.required]]
    });
    if (this.initData?.data?.mode === 'call') {
      this.seTimeNextRound()
    }
    if (this.initData?.data?.mode === 'visit') {
      this.loadAccommodation()
    }
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  sendRequestCall = () => {
    try {
      this.loading = true
      const date = moment(this.date).format('YYYY-MM-DD');
      const time = moment(this.time).format('HH:MM');
      const parseDateTime = moment(`${date} ${time}`, 'YYYY-MM-DD hh:mm').toDate();
      this.formCall.patchValue({date: parseDateTime})
      this.rest.post(`calendar`, {
        ...this.formCall.value,
        ...{
          mode: this.initData?.data?.mode,
          accommodation: this.selectAccommodation
        }
      }).subscribe(res => {
        this.loading = false;
        this.send = 'call';
        this.modalRequestService.result.emit(res)
        // this.closeModal()
      }, error => this.loading = false)
    } catch (e) {
      this.loading = false
    }
  }

  loadAccommodation = () => {
    this.accommodations$ = this.rest.get(`accommodation/all`)
  }

  closeModal = () => {
    this.bsModalRef.hide()
  }

  changeDate($event: Date): void {
    this.date = $event
  }
}
