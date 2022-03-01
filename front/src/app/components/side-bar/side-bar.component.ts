import {Component, OnInit} from '@angular/core';
import {
  faClipboard, faCalendarCheck, faFileAlt, faFolderOpen, faQuestionCircle, faChartBar,
  faBuilding
} from '@fortawesome/free-regular-svg-icons';
import {
  faSignOutAlt, faAngleRight, faArrowRight
} from '@fortawesome/free-solid-svg-icons';
import {OauthService} from "../../oauth.service";
import {Router} from "@angular/router";
import {NgxCopilotService} from "ngx-copilot";
import * as _ from 'lodash'
import {RestService} from "../../rest.service";
import {NotificationsService} from "../../notifications.service";
import {ModalRequestService} from "../modal-request/modal-request.service";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  faAngleRight = faAngleRight
  faArrowRight = faArrowRight
  public menu = [
    {
      name: 'MENU_SIDE.HOME',
      copilotLanguage: 'COPILOT.HOME',
      icon: faChartBar,
      copilot: 1,
      route: ['/']
    },
    {
      name: 'MENU_SIDE.ACCOMMODATIONS',
      copilotLanguage: 'COPILOT.ACCOMMODATION',
      icon: faBuilding,
      copilot: 2,
      route: ['/', 'accommodation']
    },
    {
      name: 'MENU_SIDE.TASKS',
      copilotLanguage: 'COPILOT.TASK',
      icon: faClipboard,
      copilot: 3,
      route: ['/', 'task']
    },
    {
      name: 'MENU_SIDE.BOOKINGS',
      copilotLanguage: 'COPILOT.BOOKING',
      icon: faCalendarCheck,
      copilot: 4,
      route: ['/', 'booking']
    },
    {
      name: 'MENU_SIDE.BALANCE',
      copilotLanguage: 'COPILOT.SETTLEMENTS',
      icon: faFileAlt,
      copilot: 5,
      route: ['/', 'settlement']
    },
    {
      name: 'Documentos',
      icon: faFolderOpen,
      route: ['/', 'task']
    },
    {
      name: 'MENU_SIDE.FAQ',
      copilotLanguage: 'COPILOT.HELP',
      icon: faQuestionCircle,
      type: 'link',
      value: 'https://www.youtube.com/channel/UCgrIGp5QAnC0J8LfNJxDRDw',
      copilot: 6,
    },
    {
      name: 'MENU_SIDE.LOGOUT',
      icon: faSignOutAlt,
      func: () => {
        this.clear()
      }
    }
  ]

  public loading: boolean

  constructor(private oauthService: OauthService, private router: Router,
              private notificationsService: NotificationsService,
              private  copilot: NgxCopilotService, private rest: RestService,
              private modalRequestService: ModalRequestService) {
  }

  ngOnInit(): void {
    const stepper = _.first(_.sortBy(this.oauthService.getStepper()).reverse())
    if (!this.oauthService.getStepper().length) {
      this.copilot.checkInit('welcome');
    } else {
      if (typeof stepper === 'number') {
        // @ts-ignore
        this.copilot.checkInit(stepper + 1)
      }

    }
  }

  nextStep = (stepNumber: any) => {
    this.oauthService.updateStepper(stepNumber).subscribe(res => {
      this.copilot.next(stepNumber)
    })
  }

  done = (step = null) => {
    if (!step) {
      this.copilot.removeWrapper();
    } else {
      this.oauthService.updateStepper(step).subscribe(res => {
        this.copilot.removeWrapper();
      })
    }
  }

  clear = () => {
    this.oauthService.clearSession();
    this.router.navigate(['/', 'oauth', 'login']);
  }

  callFn = (item) => (item?.func) ? item.func() : null;

  importDummy = () => {
    this.loading = true;
    this.rest.post(`profile/dummy`).subscribe(res => {
      this.loading = false;
      this.rest.showToast('COPILOT.IMPORT_DUMMY_TOAST')
      this.done();
      this.modalRequestService.result.emit(true)
      this.notificationsService.loadData()
      this.notificationsService.openPanel = true
    }, err => this.loading = false)
  }
}
