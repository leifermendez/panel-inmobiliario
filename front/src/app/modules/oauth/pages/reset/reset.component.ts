import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnimationOptions} from "ngx-lottie";
import {RestService} from "../../../../rest.service";
import {OauthService} from "../../../../oauth.service";
import {ToastrService} from "ngx-toastr";
import {AnimationItem} from "lottie-web";
import {MustMatch} from "../../../../helpers";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup
  options: AnimationOptions = {
    path: '/assets/animation/9710-registration-of-animated-illustrations.json',
  };
  id: string
  loading: boolean
  listSubscribers: Subscription[] = []

  constructor(private formBuilder: FormBuilder, private rest: RestService,
              private oauth: OauthService, private toastr: ToastrService,
              private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      check: ['', [Validators.required, Validators.requiredTrue]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.listener$()
  }

  listener$ = () => {
    const observer1$ = this.route.params.subscribe(params => {
      this.id = params?.id;
    });
    this.listSubscribers.push(observer1$);
  }


  resetPwd = () => {
    this.loading = true;
    const body = {
      ...this.resetForm.value, ...{id: this.id}
    }
    this.oauth.resetPwd(body)
      .subscribe(res => {
        this.loading = false;
        this.router.navigate(['/', 'oauth', 'login'])
      }, error => this.loading = false)
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  chCheck($event): void {
    this.resetForm.patchValue({check: $event.checked})
  }

}
