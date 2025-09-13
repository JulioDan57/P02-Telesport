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
  consoleIsEnabled:boolean=false;
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
      if (this.consoleIsEnabled)
      {
        console.log('Value changed from ', changes['dataForPieChart'].previousValue, ' to ', changes['dataForPieChart'].currentValue);
      }
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
      onClick: (evt, activeEls, chart) => {
        if (activeEls.length>0){
          this.sliceClickedIndex=activeEls[0].index;
          if (this.consoleIsEnabled)
          {
            console.log("Clicked index :" + activeEls[0].index + " | Label : " +this.dataForPieChart.labels[activeEls[0].index]);
          }
        }
        else
        {
          this.sliceClickedIndex=-1;
          if (this.consoleIsEnabled)
          {          
            console.log("Clicked out");
          }
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
    if (this.consoleIsEnabled)
    {            
      console.log("pie data :"+this.dataForPieChart.data);
      console.log("pie labels :"+this.dataForPieChart.labels);
    }
  }
}