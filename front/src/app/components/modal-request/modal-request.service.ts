import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalRequestService {
  @Output() result = new EventEmitter<any>();
  constructor() { }
}
