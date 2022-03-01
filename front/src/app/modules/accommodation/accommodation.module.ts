import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AccommodationRoutingModule} from './accommodation-routing.module';
import {ListComponent} from './pages/list/list.component';
import {SharedModule} from "../shared/shared.module";
import {DetailComponent} from './pages/detail/detail.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {AccDetailComponent} from './components/acc-detail/acc-detail.component';
import {AccTaskComponent} from './components/acc-task/acc-task.component';
import {AccBookingComponent} from './components/acc-booking/acc-booking.component';
import {AccDocsComponent} from './components/acc-docs/acc-docs.component';
import {PaginationModule} from "ngx-bootstrap/pagination";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ChartLineTaskComponent} from './components/chart-line-task/chart-line-task.component';
import {ChartsModule} from "ng2-charts";
import {ChartPieTaskSingleComponent} from './components/chart-pie-task-single/chart-pie-task-single.component';
import {EditComponent} from './pages/edit/edit.component';
import { AccEditComponent } from './components/acc-edit/acc-edit.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FilePickerModule} from "ngx-awesome-uploader";
import {NgSelectModule} from "@ng-select/ng-select";


@NgModule({
  declarations: [ListComponent, DetailComponent, AccDetailComponent, AccTaskComponent, AccBookingComponent,
    AccDocsComponent, ChartLineTaskComponent, ChartPieTaskSingleComponent, EditComponent, AccEditComponent],
  imports: [
    CommonModule,
    AccommodationRoutingModule,
    SharedModule,
    FontAwesomeModule,
    PaginationModule,
    NgxDatatableModule,
    TooltipModule,
    ChartsModule,
    ReactiveFormsModule,
    FilePickerModule,
    NgSelectModule,
    FormsModule
  ]
})
export class AccommodationModule {
}
