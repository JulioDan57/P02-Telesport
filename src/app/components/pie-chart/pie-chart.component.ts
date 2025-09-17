import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataForPieChart } from '../../core/models/Chart.model';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { Chart, registerables } from "chart.js";
import { FormsModule } from '@angular/forms';
Chart.register(...registerables );

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})

export class PieChartComponent implements OnInit, OnChanges{
  @Input() dataForPieChart:DataForPieChart={labels:[],data:[]};  
  @Output() chartClicked=new EventEmitter<number>(); 
  sliceClickedIndex:number=-1;
  public pieChartData!: ChartConfiguration<'pie'>['data']; 
  public pieChartOptions!: ChartOptions<'pie'>;
  public pieChartLegend = true;

  ngOnInit(){
  }  
  
  // called when "dataForPieChart" changes
  ngOnChanges(changes: SimpleChanges) {
    if (changes['dataForPieChart']) {
      this.pieChartCreation();
    }
  }

  // creation of the pie chart. "dataForPieChart" contains the labels and data parameters
  pieChartCreation(){
    this.pieChartData = {
      labels: this.dataForPieChart.labels,
      datasets: [
        {
          data:  this.dataForPieChart.data,
          label: '\ud83c\udfc5',
        }
      ],
    };

    this.pieChartOptions= {
      responsive: true,
      maintainAspectRatio: false,
      onClick: (evt, activeEls, chart) => {
        if (activeEls.length>0){
          this.sliceClickedIndex=activeEls[0].index;
        }
        else
        {
          this.sliceClickedIndex=-1;
        }
        this.chartClicked.emit(this.sliceClickedIndex);
      },
      plugins: {
        legend: {
          position: 'bottom',
          display: true,
        },
      }    
    };   
  }
}