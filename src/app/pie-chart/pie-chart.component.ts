import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables );

@Component({
  selector: 'app-pie-chart',
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  
  title = 'ng2-charts-demo';
  
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: [
      'January', 'February', 'March', 'April', 'May'
    ],
  
    datasets: [
      {
        data:  [50, 60, 70, 180, 190],
        label: '\ud83c\udfc5',
        
      //  borderColor: 'blue',
      //  backgroundColor: 'rgba(0,0,255,0.3)'
      }
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
    scales:{
      x:{
        display: false,
        title: {
          display: false,
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
    },
    plugins: {
      legend: {
        position: 'right',
      },
      /*outlabels: {
        backgroundColor: null,
        color: COLORS,
        stretch: 30,
        font: {
          resizable: true,
          minSize: 15,
          maxSize: 20,
        },
        zoomOutPercentage: 100,
        textAlign: 'start',
        backgroundColor: null
      }*/      
    }    
    
    
 
    
  };
  
  public pieChartLegend = false;
}