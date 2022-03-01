import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {SharedModule} from "../shared/shared.module";
import { DetailComponent } from './pages/detail/detail.component';
import {FilePickerModule} from "ngx-awesome-uploader";


@NgModule({
  declarations: [ModalFormComponent, DetailComponent],
    imports: [
        CommonModule,
        DocumentsRoutingModule,
        ReactiveFormsModule,
        FormlyModule,
        SharedModule,
        FilePickerModule
    ]
})
export class DocumentsModule { }
