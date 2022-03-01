import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  @Output() result = new EventEmitter<any>();

  constructor() {
  }

  reloadPaginate = (data: any) => {
    this.result.emit(data)
  }
}
