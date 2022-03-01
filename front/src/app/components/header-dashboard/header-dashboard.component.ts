import {Component, OnInit} from '@angular/core';
import {faSearch, faPhoneSquareAlt} from '@fortawesome/free-solid-svg-icons';
import {DashboardService} from "../../modules/home/pages/dashboard/dashboard.service";
import {NotificationsService} from "../../notifications.service";

// import {faPoh} from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-header-dashboard',
  templateUrl: './header-dashboard.component.html',
  styleUrls: ['./header-dashboard.component.scss']
})
export class HeaderDashboardComponent implements OnInit {
  faPhoneSquareAlt = faPhoneSquareAlt
  faSearch = faSearch

  constructor(public dashboard: DashboardService, public notificationsService: NotificationsService) {
  }

  ngOnInit(): void {
  }

}
