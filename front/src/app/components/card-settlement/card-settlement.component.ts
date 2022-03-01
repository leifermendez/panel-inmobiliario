import {Component, OnInit} from '@angular/core';
import {faFilePdf} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-card-settlement',
  templateUrl: './card-settlement.component.html',
  styleUrls: ['./card-settlement.component.scss']
})
export class CardSettlementComponent implements OnInit {
  faFilePdf = faFilePdf

  constructor() {
  }

  ngOnInit(): void {
  }

}
