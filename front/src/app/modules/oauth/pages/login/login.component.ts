import {Component, OnInit} from '@angular/core';
import {AnimationItem} from 'lottie-web';
import {AnimationOptions} from 'ngx-lottie';
import {faGoogle, faLinkedinIn} from '@fortawesome/free-brands-svg-icons';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RestService} from "../../../../rest.service";
import {OauthService} from "../../../../oauth.service";
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup
  options: AnimationOptions = {
    path: '/assets/animation/9710-registration-of-animated-illustrations.json',
  };
  faGoogle = faGoogle
  faLinkedinIn = faLinkedinIn
  loading: boolean

  constructor(private formBuilder: FormBuilder, private rest: RestService,
              private oauth: OauthService, private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      check: ['', [Validators.required, Validators.requiredTrue]],
      password: ['', Validators.required]
    });
  }

  test = () => {
    this.toastr.info('Proin eget tortor risus. Proin eget tortor risus. Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Curabitur aliquet quam id dui posuere blandit. ', 'Hello world!', {});
  }

  login = () => {
    this.loading = true;
    this.oauth.login(this.loginForm.value)
      .subscribe(res => null, error => this.loading = false)
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  chCheck($event): void {
    this.loginForm.patchValue({check: $event.checked})
  }

}
