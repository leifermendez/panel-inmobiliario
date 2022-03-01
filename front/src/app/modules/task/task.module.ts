import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { ListComponent } from './pages/list/list.component';
import {SharedModule} from "../shared/shared.module";
import { DetailComponent } from './pages/detail/detail.component';
import {QuillModule} from "ngx-quill";
import { NewTaskComponent } from './components/new-task/new-task.component';
import {NgSelectModule} from "@ng-select/ng-select";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilePickerModule} from "ngx-awesome-uploader";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TimeagoModule} from "ngx-timeago";


@NgModule({
  declarations: [ListComponent, DetailComponent, NewTaskComponent],
    imports: [
        CommonModule,
        TaskRoutingModule,
        SharedModule,
        QuillModule,
        NgSelectModule,
        FormsModule,
        ReactiveFormsModule,
        FilePickerModule,
        FontAwesomeModule,
        TimeagoModule
    ]
})
export class TaskModule { }
