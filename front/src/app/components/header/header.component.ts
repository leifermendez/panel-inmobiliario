import { Component, OnInit } from '@angular/core';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faCoffee = faCoffee;
  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    // this.translate.setDefaultLang('es');
  }

}
