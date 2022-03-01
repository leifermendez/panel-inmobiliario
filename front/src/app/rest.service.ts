import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {catchError} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class RestService {
  public headers: HttpHeaders;
  public readonly url: string = environment.api;

  constructor(public http: HttpClient,
              private router: Router,
              private toastr: ToastrService,
              private translateService: TranslateService,
              private cookieService: CookieService) {
  }

  showToast = (source: string) => {
    try {
      this.translateService.get(`${source}.TOAST`).subscribe(res => {
        if (typeof res === 'string') {
          this.translateService.get(`ERRORS.UNDEFINED`).subscribe(r => {
            this.toastr.info(r.TEXT, r.TITLE);
          })
        } else {
          this.toastr.info(res.TEXT, res.TITLE);
        }
      })
    } catch (e) {
      return 422;
    }
  }

  public findInvalidControls(form: any): any {
    const invalid = [];
    const controls = form.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push(name);
      }
    }
    return invalid;
  }

  parseHeader = (custom: any = null) => {
    let header = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    if (custom) {
      header = custom;
    }
    return new HttpHeaders(header);
  }

  handleError = (code = 401, message = '') => {
    try {
      this.translateService.get(`ERRORS.${message}`).subscribe(res => {
        if (typeof res === 'string') {
          this.translateService.get(`ERRORS.UNDEFINED`).subscribe(r => {
            this.toastr.info(r.TEXT, r.TITLE);
          })
        } else {
          this.toastr.info(res.TEXT, res.TITLE);
        }
      })
    } catch (e) {
      return 422;
    }
  }

  //
  post(path = '', body = {}, toast = true, header = null): Observable<any> {
    try {
      return this.http
        .post(`${this.url}/${path}`, body, {headers: this.parseHeader(header)})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.handleError(e.status, e?.error?.errors?.msg);
            }
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {
      return null;
    }
  }

  //
  patch(path = '', body = {}, toast = true): Observable<any> {
    try {
      return this.http
        .patch(`${this.url}/${path}`, body, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.handleError(e.status, e?.error?.errors?.msg);
            }
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {
    }
  }

  //
  // delete(path = "", toast = true): Observable<any> {
  //   try {
  //     return this.http
  //       .delete(`${this.url}/${path}`, {headers: this.parseHeader()})
  //       .pipe(
  //         catchError((e: any) => {
  //           if (toast) {
  //             this.sharedService.showError("Error", e.statusText);
  //           }
  //           this.handleError(e.status, e.statusText);
  //           //do your processing here
  //           return throwError({
  //             status: e.status,
  //             statusText: e.statusText,
  //           });
  //         })
  //       );
  //   } catch (e) {
  //   }
  // }

  get(path = '', toast = true): Observable<any> {
    try {
      return this.http
        .get(`${this.url}/${path}`, {headers: this.parseHeader()})
        .pipe(
          catchError((e: any) => {
            if (toast) {
              this.handleError(e.status, e?.error?.errors?.msg);
            }
            return throwError({
              status: e.status,
              statusText: e.statusText,
            });
          })
        );
    } catch (e) {
    }
  }
}
