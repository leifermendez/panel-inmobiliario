import {Component, Input, OnInit} from '@angular/core';
import {Task} from "../../../../models/Task.model";

@Component({
  selector: 'app-acc-task',
  templateUrl: './acc-task.component.html',
  styleUrls: ['./acc-task.component.scss']
})
export class AccTaskComponent implements OnInit {
  @Input() id: string
  @Input() data: any

  constructor() {
  }

  ngOnInit(): void {
  }

}
