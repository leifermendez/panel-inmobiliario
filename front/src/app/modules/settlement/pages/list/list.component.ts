import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  history = [
    {
      name: 'HISTORY.SETTLEMENTS'
    }
  ]
  constructor() { }

  ngOnInit(): void {
  }

}