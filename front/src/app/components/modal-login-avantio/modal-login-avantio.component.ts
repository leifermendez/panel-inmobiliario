import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BsModalRef} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-modal-login-avantio',
  templateUrl: './modal-login-avantio.component.html',
  styleUrls: ['./modal-login-avantio.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ModalLoginAvantioComponent implements OnInit {
  public initData: any
  formCall: FormGroup;

  constructor(private formBuilder: FormBuilder, private bsModalRef: BsModalRef) {
  }

  ngOnInit(): void {
    this.formCall = this.formBuilder.group({
      login: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit = () => {
    try {
      const AVANTIO_URI = 'http://app.avantio.com/index.php?action=Login&module=Usuarios&id=';
      const {login, password} = this.formCall.value
      const url = `${AVANTIO_URI}${encodeURIComponent(`${login};${password}`)}`;
      window.open(url, ' _blank');
      setTimeout(() => this.bsModalRef.hide(), 1000);
    } catch (e) {
      console.log('Error', e)
      return null;
    }
  }
}
