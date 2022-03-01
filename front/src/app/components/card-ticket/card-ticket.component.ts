import {Component, Input, OnInit} from '@angular/core';
import {faCommentAlt} from '@fortawesome/free-regular-svg-icons';
import {faPaperclip, faHome} from '@fortawesome/free-solid-svg-icons';
import {Task} from "../../models/Task.model";
import {strings as enStrings} from 'ngx-timeago/language-strings/en';
import {strings as esStrings} from 'ngx-timeago/language-strings/es';
import {TranslateService} from "@ngx-translate/core";
import {TimeagoIntl} from "ngx-timeago";

@Component({
  selector: 'app-card-ticket',
  templateUrl: './card-ticket.component.html',
  styleUrls: ['./card-ticket.component.scss']
})
export class CardTicketComponent implements OnInit {
  @Input() data: Task
  @Input() border: boolean
  faHome = faHome
  faCommentAlt = faCommentAlt
  faPaperclip = faPaperclip

  constructor(private translateService: TranslateService, private intl: TimeagoIntl) {
    intl.strings = esStrings;
    intl.changes.next();

  }

  ngOnInit(): void {
  }

}
