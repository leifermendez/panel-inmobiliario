import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartedRoutingModule } from './started-routing.module';
import { DetailComponent } from './pages/detail/detail.component';
import {SharedModule} from "../shared/shared.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {FormlyModule} from "@ngx-formly/core";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [DetailComponent],
    imports: [
        CommonModule,
        StartedRoutingModule,
        SharedModule,
        FontAwesomeModule,
        FormlyModule,
        ReactiveFormsModule
    ]
})
export class StartedModule { }
