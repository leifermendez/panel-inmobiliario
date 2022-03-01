import {Injectable} from '@angular/core';
import {RestService} from "./rest.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  public openPanel: boolean
  public data$: Observable<any>

  constructor(private rest: RestService) {
  }

  loadData = () => {
    this.rest.get(`notifications`).pipe(map(a => a.docs))
      .subscribe(res => this.data$ = res)
  }
}
