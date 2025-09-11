import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  consoleIsEnabled:boolean=true;
  isLoaded:boolean=false;
  @Input() labels:string[]=[];
  @Input() data:number[] =[];
  @Output() chartClicked=new EventEmitter<number>();
  sliceClickedIndex:number=-1;
  public pieChartData!: ChartConfiguration<'pie'>['data']; 
  public pieChartOptions!: ChartOptions<'pie'>;
  public pieChartLegend = true;

  public loadData(){
    this.pieChartData.labels=this.labels;
    this.pieChartData.datasets[0].data= this.data;
  }

  ngOnInit(){
  }  
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['labels']) {
      this.pieChartCreation();
      if (this.consoleIsEnabled)
      {
        console.log('Value changed from ', changes['data'].previousValue, ' to ', changes['data'].currentValue);
      }
    }
  }

  pieChartCreation(){
    this.pieChartData = {
      labels: this.labels,
      datasets: [
        {
          data:  this.data,
          label: '\ud83c\udfc5',
        }
      ],
    };

    this.pieChartOptions= {
      responsive: true,
      maintainAspectRatio: false,
      aspectRatio: 2,
      onClick: (evt, activeEls, chart) => {
        if (activeEls.length>0){
          this.sliceClickedIndex=activeEls[0].index;
          if (this.consoleIsEnabled)
          {
            console.log("Clicked index :" + activeEls[0].index + " | Label : " +this.labels[activeEls[0].index]);
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
      console.log("pie data :"+this.data);
      console.log("pie labels :"+this.labels);
    }
  }
}