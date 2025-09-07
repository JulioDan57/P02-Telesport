import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';

import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";

//import 'chartjs-plugin-outlabels4';
//import "chartjs-plugin-piechart-outlabels";
import { Chart, registerables } from "chart.js";
import { FormsModule } from '@angular/forms';
Chart.register(...registerables );
//import  "@energiency/chartjs-plugin-piechart-outlabels";
//Chart.register(PieChartOutlabels );

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, FormsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent implements OnInit, OnChanges{
  
  title = 'ng2-charts-demo';

  isLoaded:boolean=false;
  @Input() labels:string[]=[];
  @Input() data:number[] =[];
  @Input() dataB=5;
  @Output() chartClicked=new EventEmitter<number>();
  @Output() chartMouseMoved=new EventEmitter<number>();
  sliceClickedIndex:number=-1;
  sliceMouseMovedIndex:number=-1;
  public pieChartData!: ChartConfiguration<'pie'>['data']; 
  public pieChartOptions!: ChartOptions<'pie'>;
   public pieChartLegend = true;

  public loadData(){
    this.pieChartData.labels=this.labels;
    this.pieChartData.datasets[0].data= this.data;
  }

  ngOnInit(){
    //this.pieChartCreation();
    //this.loadData();
    //this.pieChartCreation()    
    //this.label= 'Number of entries';
    //this.text= '30';
    //this.backgroundColorRGB=[255,0,0];
  }  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['data'] && changes['labels']) {
      this.pieChartCreation();
    //  console.log('La valeur a changé de', changes['data'].previousValue, 'à', changes['data'].currentValue);
    }
  }

  pieChartCreation(){
    this.pieChartData = {
      labels: this.labels,
      datasets: [
        {
          data:  this.data,
          label: '\ud83c\udfc5',
          //  borderColor: 'blue',
          //  backgroundColor: 'rgba(0,0,255,0.3)'
        }
      ],
    };

    this.pieChartOptions= {
      //responsive: true,
      aspectRatio: 2,
      //events: ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
      onHover:(event, elements, chart)=> {
        if (event.type == 'mousemove'){
          if (elements.length>0){
            this.sliceMouseMovedIndex=elements[0].index;
            console.log("index: "+elements[0].index+ " | Text :" + this.labels[elements[0].index])
          }
        }
        else
        {
          this.sliceClickedIndex=-1;
        }        
      },

      onClick: (evt, activeEls, chart) => {
        if (activeEls.length>0){
          //this.sliceClickedIndex=activeEls[0].index;
          //this.sliceClickedIndex=this.sliceMouseMovedIndex;
          console.log("index= " + activeEls[0].index + " | "+ this.sliceClickedIndex + " | " +this.labels[activeEls[0].index]);
        }
        else
        {
          console.log("Clicked out");
          //this.sliceClickedIndex=-1;
        }

        //this.loadData();
        //chart.update();
      },
      plugins: {
        legend: {
          position: 'bottom',
          display: true,
        },
      }    
    };   
    console.log("pie data"+this.data);
  }

  chartClick(){
    this.sliceClickedIndex=this.sliceMouseMovedIndex;
    this.chartClicked.emit(this.sliceClickedIndex);
  }

  chartMouseMove(){
    this.chartMouseMoved.emit(this.sliceMouseMovedIndex);
  }

}