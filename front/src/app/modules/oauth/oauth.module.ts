import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OauthRoutingModule } from './oauth-routing.module';
import { LoginComponent } from './pages/login/login.component';
import { TranslateModule } from '@ngx-translate/core';
import { LottieModule } from 'ngx-lottie';
import { RegisterComponent } from './pages/register/register.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {ReactiveFormsModule} from "@angular/forms";
import {PasswordStrengthMeterModule} from "angular-password-strength-meter";
import { ForgotComponent } from './pages/forgot/forgot.component';
import { ResetComponent } from './pages/reset/reset.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotComponent, ResetComponent],
    imports: [
        SharedModule,
        CommonModule,
        OauthRoutingModule,
        TranslateModule,
        LottieModule,
        FontAwesomeModule,
        ReactiveFormsModule,
        PasswordStrengthMeterModule
    ]
})
export class OauthModule { }
