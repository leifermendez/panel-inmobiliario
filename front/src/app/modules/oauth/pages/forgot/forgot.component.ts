import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnimationOptions} from "ngx-lottie";
import {RestService} from "../../../../rest.service";
import {OauthService} from "../../../../oauth.service";
import {ToastrService} from "ngx-toastr";
import {AnimationItem} from "lottie-web";

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  forgotForm: FormGroup
  options: AnimationOptions = {
    path: '/assets/animation/9710-registration-of-animated-illustrations.json',
  };
  sendData: any

  loading: boolean

  constructor(private formBuilder: FormBuilder, private rest: RestService,
              private oauth: OauthService, private toastr: ToastrService,
  ) {
  }

  ngOnInit(): void {
    this.forgotForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      check: ['', [Validators.required, Validators.requiredTrue]]
    });
  }

  clear = () => {
    this.forgotForm.reset()
    this.loading = false
    this.sendData = null
  }

  reset = () => {
    this.loading = true;
    this.oauth.forgot(this.forgotForm.value)
      .subscribe(res => {
        this.sendData = res
        this.loading = false
      }, err => this.loading = false)
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  chCheck($event): void {
    this.forgotForm.patchValue({check: $event.checked})
  }

}
