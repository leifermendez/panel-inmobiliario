import {HeaderComponent} from '../../components/header/header.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {
  TranslateModule,
} from '@ngx-translate/core';
import {NgxPrettyCheckboxModule} from 'ngx-pretty-checkbox';
import {HeaderDashboardComponent} from '../../components/header-dashboard/header-dashboard.component';
import {SideBarComponent} from "../../components/side-bar/side-bar.component";
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {CardTicketComponent} from "../../components/card-ticket/card-ticket.component";
import {HistoryComponent} from "../../components/history/history.component";
import {CardAccommodationComponent} from "../../components/card-accommodation/card-accommodation.component";
import {NgxInputStarRatingModule} from "@ngx-lite/input-star-rating";
import {RouterModule} from "@angular/router";
import {CardBookingComponent} from "../../components/card-booking/card-booking.component";
import {CardDocsComponent} from "../../components/card-docs/card-docs.component";
import {GanttHomeComponent} from "../../components/gantt-home/gantt-home.component";
import {NgxDailyGanttChartModule} from "ngx-daily-gantt-chart";
import {CalendarBookingComponent} from "../../components/calendar-booking/calendar-booking.component";
import {CalendarCommonModule, CalendarMonthModule} from "angular-calendar";
import {CardTimeLineComponent} from "../../components/card-time-line/card-time-line.component";
// import {NgxTimelineModule} from "ngx-timeline";
import {ModalRequestComponent} from "../../components/modal-request/modal-request.component";
import {QuillModule} from "ngx-quill";
import {CardSettlementComponent} from "../../components/card-settlement/card-settlement.component";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {DashboardDocsComponent} from "../../components/dashboard-docs/dashboard-docs.component";
import {FieldCustomMapBoxComponent} from "../../components/field-custom-map-box/field-custom-map-box.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FormlyModule} from "@ngx-formly/core";
import {FooterSingleComponent} from "../../components/footer-single/footer-single.component";
import {LoadingBtnDirective} from "../../loading-btn.directive";
import {MapUrlPipe} from "../../map-url.pipe";
import {TimeagoModule} from "ngx-timeago";
import {FirstStepperComponent} from "../../components/first-stepper/first-stepper.component";
import {NgSelectModule} from "@ng-select/ng-select";
import {ArrayReversePipe} from "../../array-reverse.pipe";
import {StripeHtmlPipe} from "../../stripe-html.pipe";
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import {TimepickerModule} from "ngx-bootstrap/timepicker";
import {SubHeaderAccommodationComponent} from "../../components/sub-header-accommodation/sub-header-accommodation.component";
import {CardEventComponent} from "../../components/card-event/card-event.component";
import {ModalSerchComponent} from "../../components/modal-serch/modal-serch.component";
import {NgxHighlightWordsModule} from "ngx-highlight-words";
import {NgxCopilotModule} from "ngx-copilot";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {FindAuthorPipe} from "../../find-author.pipe";
import {BackgroundAccPipe} from "../../background-acc.pipe";

@NgModule({
  declarations: [HeaderComponent, HeaderDashboardComponent, SideBarComponent, CardTicketComponent, HistoryComponent,
    CardAccommodationComponent, CardBookingComponent, CardDocsComponent, GanttHomeComponent, CalendarBookingComponent,
    CardTimeLineComponent, ModalRequestComponent, CardSettlementComponent, DashboardDocsComponent, FieldCustomMapBoxComponent,
    FooterSingleComponent, LoadingBtnDirective, MapUrlPipe, FirstStepperComponent, ArrayReversePipe, StripeHtmlPipe,
    SubHeaderAccommodationComponent, CardEventComponent, ModalSerchComponent, FindAuthorPipe, BackgroundAccPipe],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    NgxDatatableModule,
    NgxHighlightWordsModule,
    NgxPrettyCheckboxModule,
    FontAwesomeModule,
    NgxInputStarRatingModule,
    RouterModule,
    TranslateModule,
    NgxDailyGanttChartModule,
    NgSelectModule,
    CalendarMonthModule,
    QuillModule.forRoot(),
    BsDropdownModule,
    CalendarCommonModule,
    ReactiveFormsModule,
    FormlyModule,
    TimeagoModule,
    FormsModule,
    NgxHighlightWordsModule,
    NgxCopilotModule,
    PaginationModule
  ],
  exports: [HeaderComponent, TranslateModule, NgxPrettyCheckboxModule, HeaderDashboardComponent, GanttHomeComponent, CardTimeLineComponent,
    CardTicketComponent, HistoryComponent, CardAccommodationComponent, CardBookingComponent, CardDocsComponent, CalendarBookingComponent,
    SideBarComponent, ModalRequestComponent, CardSettlementComponent, DashboardDocsComponent, FieldCustomMapBoxComponent,
    FooterSingleComponent, LoadingBtnDirective, MapUrlPipe, FirstStepperComponent, ArrayReversePipe, StripeHtmlPipe,
    SubHeaderAccommodationComponent, CardEventComponent, ModalSerchComponent, FindAuthorPipe, BackgroundAccPipe]
})
export class SharedModule {
}
