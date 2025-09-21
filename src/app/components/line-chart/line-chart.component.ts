import { Component,Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataForLineChart } from '../../core/models/Chart.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from "chart.js";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables );

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})

export class LineChartComponent implements OnInit, OnChanges{
  @Input() dataForLineChart:DataForLineChart ={labels:[],data:[],xAxisLabel:""};
  public lineChartData!: ChartConfiguration<'line'>['data']; 
  public lineChartOptions!: ChartOptions<'line'>;

  ngOnInit(){
  }  

   // called when "dataForLineChart" changes
  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataForLineChart']) {
      this.lineChartCreation();
    }
  }

  // creation of the pie chart. "dataForLineChart" contains the labels, data and x axis label parameters
  lineChartCreation(){
    this.lineChartData = {
      labels: this.dataForLineChart.labels,
  
      datasets: [
        {
          data:this.dataForLineChart.data,
          label: 'Medals',
          fill: false,
          tension: 0.0,
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.3)'
        }
      ],
    };

    this.lineChartOptions= {
      responsive: true,
      maintainAspectRatio: false,
      scales:{
        x:{
          display: true,
          title: {
            display: true,
            text: this.dataForLineChart.xAxisLabel,
            color: 'gray',
            font: {
              family: 'Calibri',
              size: 25,
              weight: 'normal',
              lineHeight: 1.2,
            },
          }
        }
      }
    };
  }
  public lineChartLegend = false;
}