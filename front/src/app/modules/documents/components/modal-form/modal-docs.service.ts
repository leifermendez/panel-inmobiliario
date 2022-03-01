import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalDocsService {
  @Output() result = new EventEmitter<any>();
  constructor() { }
}
