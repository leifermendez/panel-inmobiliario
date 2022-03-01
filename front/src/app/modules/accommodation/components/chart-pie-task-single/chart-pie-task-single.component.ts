import {Component, Input, OnInit} from '@angular/core';
import {ChartOptions, ChartType} from "chart.js";
import {Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet} from "ng2-charts";

@Component({
  selector: 'app-chart-pie-task-single',
  templateUrl: './chart-pie-task-single.component.html',
  styleUrls: ['./chart-pie-task-single.component.scss']
})
export class ChartPieTaskSingleComponent implements OnInit {
  @Input() title: string
  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true
  };
  public pieChartLabels: Label[] = [['Download'], ['Sales']];
  public pieChartData: SingleDataSet = [300, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor() {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


  ngOnInit(): void {
  }

}
