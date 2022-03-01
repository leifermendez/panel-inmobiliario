import {Injectable} from '@angular/core';
import {Pagination} from "../../models/Pagination.model";

@Injectable({
  providedIn: 'root'
})
export class HistoryPaginateService {
  public pagination = []
  insideFnSource: any

  // public pagination: Pagination;

  constructor() {
  }


  setter = (key: string, data: any) => {
    if (!this.pagination.length) {
      this.pagination.push({
        key,
        data: {...data, ...{docs: null}}
      });
    } else {
      if (!this.pagination.find(a => `${a.key}` === `${key}`)) {
        this.pagination.push({
          key,
          data: {...data, ...{docs: null}}
        });
      }
    }

  }
}
