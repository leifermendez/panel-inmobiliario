import {Injectable} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {RestService} from "./rest.service";
import {environment} from "../environments/environment";
import {LocalStorageService} from "ngx-localstorage";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OauthService {

  constructor(private cookieService: CookieService, private rest: RestService,
              private storageService: LocalStorageService, private router: Router) {
  }

  public checkSession = () => new Promise((resolve, reject) => {
    if (!this.cookieService.check('token')) {
      this.redirectLogin()
      reject(false);
    } else {
      this.rest.get(`token`, true).subscribe(res => {
        this.cookieService.set(
          'token',
          res.token,
          environment.daysTokenExpire,
          '/');
        resolve(true);
        this.cookieService.set(
          'stepper',
          JSON.stringify(res.user?.stepper),
          365,
          '/');
        resolve(true);
        this.storageService.set('user', res.user)
      }, err => this.redirectLogin());
    }
  })

  public updateStepper = (stepper: any) => {
    return this.rest.patch(`profile/stepper`, {stepper})
  }

  public login(credential: any): Observable<any> {
    return this.rest.post(`login`, credential).pipe(
      map(a => {
        if (a && a.token) {
          this.cookieService.set(
            'token',
            a.token,
            environment.daysTokenExpire,
            '/');
          this.cookieService.set(
            'stepper',
            JSON.stringify(a.user?.stepper),
            365,
            '/');
          this.storageService.set('user', a?.user)
          this.router.navigate(['/', 'home']);
        }
      })
    )
  }

  public forgot(email: any): Observable<any> {
    return this.rest.post(`forgot`, email)
  }

  public resetPwd(data: any): Observable<any> {
    return this.rest.post(`reset`, data)
  }

  public getStepper = () => {
    try {
      return JSON.parse(this.cookieService.get('stepper'))
    } catch (e) {
      return []
    }
  }

  public getCurrentUser = () => {
    try {
      return this.storageService.get('user')
    } catch (e) {
      return []
    }
  }

  public register(credential: any): Observable<any> {
    return this.rest.post(`register`, credential).pipe(
      map(a => {
        if (a && a.token) {
          this.cookieService.set(
            'token',
            a.token,
            environment.daysTokenExpire,
            '/');
          this.cookieService.set(
            'stepper',
            JSON.stringify(a.user?.stepper),
            365,
            '/');
          this.router.navigate(['/', 'home']);
        }
      })
    )
  }

  redirectLogin = () => {
    this.storageService.clear()
    this.cookieService.delete('token', '/')
    this.cookieService.delete('stepper', '/')
    this.router.navigate(['/', 'oauth', 'login']);
  }

  public clearSession = () => {
    this.storageService.clear()
    this.cookieService.delete('stepper', '/')
    this.cookieService.delete('token', '/')
  }
}
