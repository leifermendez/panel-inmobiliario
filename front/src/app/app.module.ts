import {SharedModule} from './modules/shared/shared.module';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LottieModule} from 'ngx-lottie';
import player from 'lottie-web';
import {TimeagoIntl, TimeagoModule} from "ngx-timeago";
import {NgxInputStarRatingModule} from "@ngx-lite/input-star-rating";
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/moment';
import * as moment from 'moment';
import {ModalModule} from "ngx-bootstrap/modal";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule, FormlyFieldInput} from '@ngx-formly/bootstrap';
import {FieldCustomMapBoxComponent} from './components/field-custom-map-box/field-custom-map-box.component';
import {applyAutocompleteExtension} from "./autocomplete.extension";
import {CookieService} from "ngx-cookie-service";
import {NgxLocalStorageModule} from "ngx-localstorage";
import {LoadingBtnDirective} from './loading-btn.directive';
import {ToastrModule, ToastrService} from "ngx-toastr";
import {WindowRef} from "./window.ref";
import {FieldCustomCountryComponent} from './components/field-custom-country/field-custom-country.component';
import {FieldFileUploadComponent} from './components/field-file-upload/field-file-upload.component';
import {FilePickerModule} from "ngx-awesome-uploader";
import {AuthInterceptorService} from "./auth-interceptor.service";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgxCopilotModule} from "ngx-copilot";
import {PaginationModule} from "ngx-bootstrap/pagination";
import {FindAuthorPipe} from './find-author.pipe';
import {BackgroundAccPipe} from './background-acc.pipe';
import {NgSelectModule} from "@ng-select/ng-select";
import {FieldCustomSelectComponent} from './components/field-custom-select/field-custom-select.component';
import {FieldCustomCalendarComponent} from './components/field-custom-calendar/field-custom-calendar.component';
import {BsDatepickerModule} from "ngx-bootstrap/datepicker";
import { ModalLoginAvantioComponent } from './components/modal-login-avantio/modal-login-avantio.component';


// tslint:disable-next-line:typedef
export function momentAdapterFactory() {
  return adapterFactory(moment);
};

// tslint:disable-next-line: typedef
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

// tslint:disable-next-line: typedef
export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    FieldCustomCountryComponent,
    FieldFileUploadComponent,
    FieldCustomSelectComponent,
    FieldCustomCalendarComponent,
    ModalLoginAvantioComponent,
  ],
  imports: [
    SharedModule,
    HttpClientModule,
    BrowserModule,
    NgxCopilotModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 0,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
      closeButton: true,
      easeTime: 100
    }),
    PaginationModule.forRoot(),
    TimeagoModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    NgxInputStarRatingModule,
    LottieModule.forRoot({player: playerFactory}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      },
      extend: true,
      defaultLanguage: 'es'
    }),
    BrowserAnimationsModule,
    NgxLocalStorageModule.forRoot(),
    NgSelectModule,
    CalendarModule.forRoot({provide: DateAdapter, useFactory: momentAdapterFactory}),
    ReactiveFormsModule,
    FormlyModule.forRoot({
      types: [
        {name: 'fileupload', component: FieldFileUploadComponent},
        {name: 'mapboxinput', component: FieldCustomMapBoxComponent},
        {name: 'selectcountry', component: FieldCustomCountryComponent},
        {name: 'selectuiux', component: FieldCustomSelectComponent},
        {name: 'date-ui', component: FieldCustomCalendarComponent},
      ],
      extensions: [
        {
          name: 'autocomplete',
          extension: {prePopulate: applyAutocompleteExtension},
        }
      ],
      extras: {lazyRender: true}
    }),
    FormlyBootstrapModule,
    FilePickerModule,
    FontAwesomeModule,
    FormsModule,
    BsDatepickerModule
  ],
  providers: [HttpClientModule, CookieService, ToastrService, TimeagoIntl, WindowRef,
    [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }],],
  bootstrap: [AppComponent],
  exports: [TranslateModule, LoadingBtnDirective]
})
export class AppModule {
}
