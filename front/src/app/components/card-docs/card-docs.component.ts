import {Component, Input, OnInit} from '@angular/core';
import {faQuestionCircle} from '@fortawesome/free-regular-svg-icons';
import {DocsService} from "../../modules/documents/docs.service";
import {DocsModel} from "../../models/Docs.model";
import {FormyModel} from "../../models/Formy.model";
import {RestService} from "../../rest.service";

@Component({
  selector: 'app-card-docs',
  templateUrl: './card-docs.component.html',
  styleUrls: ['./card-docs.component.scss']
})
export class CardDocsComponent implements OnInit {
  @Input() data: DocsModel
  faQuestionCircle = faQuestionCircle

  constructor(private docsService: DocsService, private rest: RestService) {
  }

  loadDataDocument = (id: string) => {
    return this.rest.get(`/documentation/${id}`);
  }

  ngOnInit(): void {
  }

  openModal = (data: any) => {
    if (data !== undefined) {
      this.docsService.callForm(data);
    }
  }

}
