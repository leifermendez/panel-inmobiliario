import {AfterViewChecked, AfterViewInit, Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import * as vivus from 'vivus';
import * as _ from 'lodash';
import {faSquare, faCheckCircle, faCheckSquare} from '@fortawesome/free-regular-svg-icons';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {StartedService} from "./started.service";
import {MapBoxCustomService} from "../../../map-box/map-box-custom.service";
import {RestService} from "../../../../rest.service";
import {ActivatedRoute, Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";
import {environment} from "../../../../../environments/environment";
import {LocalStorageService} from "ngx-localstorage";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, AfterViewInit, AfterViewChecked, OnDestroy {
  public listSubscribers: any = [];
  faCheckSquare = faCheckSquare
  faSquare = faSquare
  formsGlobal = new FormGroup({});
  // formOnBoard = new FormGroup({});
  dataFinish: any
  dataInitial: any
  model: any
  switch: any;
  slug: string
  loading: boolean

  constructor(private fb: FormBuilder, public startedService: StartedService, private rest: RestService,
              private route: ActivatedRoute, private router: Router,
              private cookieService: CookieService, private storageService: LocalStorageService,
              private mapBoxCustomService: MapBoxCustomService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.listener$();
  }

  public checkValid = (form: any) => {
    return this[form];
  }

  public findInvalidControls(form: any): any[] {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  listener$ = () => {
    const observer1$ = this.mapBoxCustomService.result.subscribe((res: any) => {
      const {coordinates} = res.geometry
      this.formsGlobal.patchValue(
        {
          street: res.text || '',
          zip: this.mapBoxCustomService.getPostCode(res, 'postcode'),
          state: this.mapBoxCustomService.getPostCode(res, 'region'),
          city: this.mapBoxCustomService.getPostCode(res, 'place'),
          country: this.mapBoxCustomService.getPostCode(res, 'country', 'short_code').toUpperCase(),
          location: {
            type: 'Point',
            coordinates
          }
        }
      );
    })
    const observer2$ = this.route.params.subscribe(params => {
      this.slug = params.id; // (+) converts string 'id' to a number
      this.rest.get(`landing/${this.slug}`).subscribe(res => this.parseData(res))
    });
    this.listSubscribers.push(observer1$);
    this.listSubscribers.push(observer2$);
  }

  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.listSubscribers.forEach(a => a.unsubscribe())
  }

  ngAfterViewInit(): void {

  }

  changeTab(a: any): void {

    this.formsGlobal = new FormGroup({});
    if (this.cookieService.check('step')) {
      const steps = _.compact(this.cookieService.get('step').toString().split(','))
      if (steps.length) {
        this.switch = this.dataInitial?.forms[steps.length];
      }
      if (steps.length === this.dataInitial?.forms?.length) {
        this.dataFinish = true
      }
    } else {
      this.switch = _.first(this.dataInitial?.forms);
    }
  }

  private parseData(res: any): void {
    this.dataInitial = res;
    this.changeTab(_.first(res.forms));
  }

  sendEvent = () => {

    const data = _.find(this.dataInitial?.forms, {_id: this.switch?._id});
    const {endPoint} = data
    const body = {
      ...this.formsGlobal.value, ...{
        role: 'lead',
        owner: this.storageService.get('owner')
      }
    }

    if (data?._id) {
      const currentCookie = this.cookieService.get('step') + `,${data._id}`;
      this.cookieService.set('step', currentCookie, environment.daysTokenExpire, '/')
      if (endPoint) {
        this.loading = true;
        this.rest.post(`forms/event/${endPoint}`, {body}).subscribe(res => {
          this.loading = false;
          if (endPoint.includes('user')) {
            this.storageService.set(`owner`, res?._id)
          }
        }, err => this.loading = false)
      }
      this.changeTab({})
    }
  }

  refresh(): void {
    this.storageService.clear();
    this.cookieService.delete('step', '/')
    this.cookieService.delete('token', '/')
    this.router.navigate(['/', 'oauth', 'login'])
  }
}
