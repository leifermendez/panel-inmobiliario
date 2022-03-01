import {EventEmitter, Injectable, Output} from '@angular/core';
import {BsModalRef, BsModalService} from "ngx-bootstrap/modal";
import {ModalRequestComponent} from "../../../../components/modal-request/modal-request.component";
import {ModalSerchComponent} from "../../../../components/modal-serch/modal-serch.component";
import {ModalLoginAvantioComponent} from "../../../../components/modal-login-avantio/modal-login-avantio.component";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  bsModalRef: BsModalRef;
  @Output() result = new EventEmitter<any>();

  colors: any = {
    green: {
      primary: '#00b894',
      secondary: '#FAE3E3',
    },
    blue: {
      primary: '#1e90ff',
      secondary: '#D1E8FF',
    },
    yellow: {
      primary: '#ffc048',
      secondary: '#FDF1BA',
    },
  };

  constructor(private modalService: BsModalService) {
  }

  openRequest(config: {}, data: any = null): void {
    const initialState = {
      initData: {
        data, config
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalRequestComponent,
      Object.assign({initialState}, {
        class: 'modal-request-action  animate__animated animate__fadeInDown',
        ignoreBackdropClick: false
      })
    );
  }

  openLoginExternal(config: {}, data: any = null): void {
    const initialState = {
      initData: {
        data, config
      }
    };

    this.bsModalRef = this.modalService.show(
      ModalLoginAvantioComponent,
      Object.assign({initialState}, {
        class: 'modal-request-action  animate__animated animate__fadeInDown',
        ignoreBackdropClick: false
      })
    );
  }

  openSearch(): void {
    const initialState: any = {
      initData: {}
    };

    this.bsModalRef = this.modalService.show(
      ModalSerchComponent,
      Object.assign({initialState}, {
        class: 'modal-request-action  modal-lg',
        ignoreBackdropClick: false
      })
    );
  }
}
