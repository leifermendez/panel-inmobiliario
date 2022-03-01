import {EventEmitter, Injectable, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalFormComponent} from "./components/modal-form/modal-form.component";

@Injectable({
  providedIn: 'root'
})
export class DocsService {
  @Output() result = new EventEmitter<any>();
  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) {
  }

  callForm(docsForm: any): void {
    const initialState = {
      initData: docsForm
    };

    this.bsModalRef = this.modalService.show(
      ModalFormComponent,
      Object.assign({initialState}, {
        // animated: false,
        class: 'modal-request-action modal-xl ',
        ignoreBackdropClick: true
      })
    );
  }
}
