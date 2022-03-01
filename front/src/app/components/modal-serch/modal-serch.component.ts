import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild
} from '@angular/core';
import {defer, Observable} from "rxjs";
import * as _ from 'lodash';
import {
  faSearch, faCommentAlt, faMapMarkedAlt, faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons';
import {debounceTime, finalize, map} from "rxjs/operators";
import {BsModalRef} from "ngx-bootstrap/modal";
import {Router} from "@angular/router";
import {RestService} from "../../rest.service";

@Component({
  selector: 'app-modal-serch',
  templateUrl: './modal-serch.component.html',
  styleUrls: ['./modal-serch.component.scss']
})
export class ModalSerchComponent implements OnInit, AfterViewInit, AfterViewChecked {
  @ViewChild('searchInput') searchElement: ElementRef;
  faSearch = faSearch;
  faCommentAlt = faCommentAlt;
  faMapMarkedAlt = faMapMarkedAlt;
  faExternalLinkAlt = faExternalLinkAlt;
  results$: any;
  srcInput: any;
  loading: boolean;

  constructor(private rest: RestService, private cdRef: ChangeDetectorRef,
              private router: Router, private bsModalRef: BsModalRef) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => { // this will make the execution after the above boolean has changed
      this.searchElement.nativeElement.focus();
    }, 0);
  }

  ngOnInit(): void {

  }

  prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
    return (source: Observable<T>): Observable<T> => defer(() => {
      callback();
      return source;
    });
  }

  search = (q: string) => {
    if (q.length > 2) {
      this.loading = true;
      this.results$ = this.rest.get(`search?q=${q}`)
        .pipe(
          map(a => a.map(b => _.first(b))),
          debounceTime(100),
          this.prepare(() => this.loading = true),
          finalize(() => this.loading = false)
        );
    }
  };

  identify(index, item): void {
    return item._id;
  }

  ngAfterViewChecked(): void {

    this.cdRef.detectChanges();
  }

  goTo(a: any): void {
    if (['accommodation', 'booking', 'task'].includes(a.source)) {
      this.router.navigate(['/', a.source, a._id]);
    }
    if (['event'].includes(a.source) && (a.behavior?.mode === 'router')) {
      this.router.navigate(a.behavior.router.split('/'));
    }
    this.bsModalRef.hide();
  }
}
