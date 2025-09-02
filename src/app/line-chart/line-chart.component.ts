import { Component } from '@angular/core';
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
export class LineChartComponent  {
  
  title = 'ng2-charts-demo';
  
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012
    ],
  
    datasets: [
      {
        data: [ 45, 50, 60, 70, 75, 65, 50, 60, 55, 50, 45, 45 ],
        label: 'Medals',
        fill: false,
        tension: 0.0,
        borderColor: 'blue',
        backgroundColor: 'rgba(0,0,255,0.3)'
      }
    ],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    scales:{
      x:{
        display: true,
        title: {
          display: true,
          text: 'Dates',
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
  
  public lineChartLegend = false;
}