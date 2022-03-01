import {Component, OnInit} from '@angular/core';
import {faGoogle, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../../rest.service";
import {OauthService} from "../../../../oauth.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup
  faGoogle = faGoogle
  faLinkedinIn = faLinkedinIn
  loading: boolean

  constructor(private formBuilder: FormBuilder, private rest: RestService,
              private oauth: OauthService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      check: ['', [Validators.required, Validators.requiredTrue]]
    });
  }

  pwdMatchValidator(frm: FormGroup): { mismatch: boolean } {
    console.log(frm.get('password').value)
    console.log(frm.get('confirmedPassword').value)
    return frm.get('password').value === frm.get('confirmedPassword').value
      ? null : {mismatch: true};
  }

  chCheck($event): void {
    this.registerForm.patchValue({check: $event.checked})
  }

  register = () => {
    this.loading = true;
    this.oauth.register(this.registerForm.value)
      .subscribe(res => null, error => this.loading = false)

    // setTimeout(() => this.loading = false, 2000)
  }

  public findInvalidControls(form: any): any[] {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }
}
