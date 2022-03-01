import {Component} from '@angular/core';
import {NavigationEnd, NavigationStart, Router} from "@angular/router";
import {delay, take} from "rxjs/operators";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front';

  constructor(private router: Router, private modalService: BsModalService) {
    router.events.subscribe((event) => {

      if (event instanceof NavigationEnd) {
        for (let i = 1; i <= this.modalService.getModalsCount(); i++) {
          this.modalService.hide(i);
        }
      }
    });
  }

}
