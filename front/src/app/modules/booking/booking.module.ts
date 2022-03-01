import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { ListComponent } from './pages/list/list.component';
import {SharedModule} from "../shared/shared.module";
import { DetailComponent } from './pages/detail/detail.component';


@NgModule({
  declarations: [ListComponent, DetailComponent],
    imports: [
        CommonModule,
        BookingRoutingModule,
        SharedModule
    ]
})
export class BookingModule { }
