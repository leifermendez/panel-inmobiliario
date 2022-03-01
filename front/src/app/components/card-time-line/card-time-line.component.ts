import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {
  faClipboard, faCalendarCheck, faStickyNote, faFolderOpen, faQuestionCircle, faChartBar,
  faBuilding
} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-card-time-line',
  templateUrl: './card-time-line.component.html',
  styleUrls: ['./card-time-line.component.scss'],
})
export class CardTimeLineComponent implements OnInit {
  @Input() data: any
  faClipboard = faClipboard
  faCalendarCheck = faCalendarCheck
  faStickyNote = faStickyNote

  constructor() {
  }

  ngOnInit(): void {

  }

}
