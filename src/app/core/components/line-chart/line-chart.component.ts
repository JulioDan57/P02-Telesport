import { Component,Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
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
  consoleIsEnabled:boolean=true;
  @Input() labels:number[]=[];
  @Input() data:number[] =[];  
  @Input() xAxisLabel:string=""; //Dates
  public lineChartData!: ChartConfiguration<'line'>['data']; 
  public lineChartOptions!: ChartOptions<'line'>;

  public loadData(){
    this.lineChartData.labels=this.labels;
    this.lineChartData.datasets[0].data= this.data;
  }

  ngOnInit(){
    //this.lineChartCreation();
  }  

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['labels']) {
      this.lineChartCreation();
      if (this.consoleIsEnabled)
      {      
        console.log('Value changed from ', changes['data'].previousValue, ' to ', changes['data'].currentValue);
      }
    }
  }
  lineChartCreation(){
    this.lineChartData = {
      labels: this.labels,
  
      datasets: [
        {
          data:this.data,
          label: 'Medals',
          fill: false,
          tension: 0.0,
          borderColor: 'blue',
          backgroundColor: 'rgba(0,0,255,0.3)'
        }
      ],
    };

    this.lineChartOptions= {
      responsive: false,
      scales:{
        x:{
          display: true,
          title: {
            display: true,
            text: this.xAxisLabel,//'Dates',
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