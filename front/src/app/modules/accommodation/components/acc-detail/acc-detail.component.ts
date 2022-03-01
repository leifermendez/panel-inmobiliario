import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Accommodation} from "../../../../models/Accommodation.model";
import {faMapMarkerAlt, faAngleRight} from '@fortawesome/free-solid-svg-icons';
import {WindowRef} from "../../../../window.ref";
import {Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AccommodationService} from "../../accommodation.service";
import {Subscription} from "rxjs";
import {OauthService} from "../../../../oauth.service";

@Component({
  selector: 'app-acc-detail',
  templateUrl: './acc-detail.component.html',
  styleUrls: ['./acc-detail.component.scss']
})
export class AccDetailComponent implements OnInit, OnDestroy {
  @Input() id: string
  @Input() controls: boolean
  @Input() data: Accommodation
  faMapMarkerAlt = faMapMarkerAlt
  panels = []
  listSubscribers: Subscription[] = []

  constructor(private windowRef: WindowRef, private router: Router, private translateService: TranslateService,
              private accommodationService: AccommodationService, public oauth: OauthService) {
  }

  ngOnInit(): void {
    this.listener$()
    this.panels = [
      {
        icon: 'uil-clipboard',
        value: 'TASK.ADD',
        disable: false,
        type: 'router',
        router: ['/', 'task', 'new', this.id]
      },
      {
        icon: 'uil-calendar-alt',
        value: 'BOOKINGS.ADD',
        disable: false,
        type: 'link',
        link: 'AVANTIO.LOGIN_LINK',
        router: ['/']
      },
      {
        icon: 'uil-bill',
        type: 'router',
        value: 'SETTLEMENT_LIST.VIEW',
        disable: true,
        router: []
      }
    ]
  }

  gotTo(a): void {
    if (a.type === 'link') {
      this.translateService.get(a.link).subscribe(res => {
        this.windowRef.nativeWindow.open(res, '_blank');
      })
    } else {
      this.router.navigate(a.router)
    }
  }

  listener$ = () => {
    const observer1$ = this.accommodationService.result.subscribe(res => {
      this.data = res
    });

    this.listSubscribers.push(observer1$);
  }

  ngOnDestroy(): void {
    this.listSubscribers.forEach((subscription) => subscription.unsubscribe())
  }

}

