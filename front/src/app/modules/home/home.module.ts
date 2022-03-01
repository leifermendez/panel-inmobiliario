import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {SharedModule} from "../shared/shared.module";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {CalendarModule} from "angular-calendar";


@NgModule({
  declarations: [DashboardComponent],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SharedModule,
        NgxDatatableModule,
        CalendarModule
    ]
})
export class HomeModule { }
