import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic, DataPerCountry } from 'src/app/core/models/Olympic';
import { LowerCasePipe } from '@angular/common';
import { DataForLineChart } from 'src/app/core/models/Chart.model';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit, OnDestroy {
  public olympics$!: Observable<Olympic[]>; 
  public olympicData!: Olympic[];
  private olympicCountryData:Olympic|undefined= undefined;
  public selectedCoutryData: DataPerCountry|null=null;
  public countryId="";
  public lowerCasePipe = inject(LowerCasePipe);
  public dataForCountryLineChart!: DataForLineChart;
  private olympicSub!: Subscription;
  private countrySub!: Subscription;

  toLowerCase(value: string): string {
    return this.lowerCasePipe.transform(value);
  }
  
  constructor(private olympicService: OlympicService, private route:ActivatedRoute) {}

  ngOnInit(): void {

    // Subscribe to the URL parameters to get the country name
    this.countrySub = this.route.params.subscribe(params => {
      const country = params['id'];
      if (country) {
          this.countryId = country;
      }
    });

    // get the Olympic object that correspond to the country name obtained before
    this.olympicSub=this.olympicService.getOlympicByCountry(this.countryId).subscribe(data =>{
      this.olympicCountryData=data;
      if (this.olympicCountryData!=null){
        this.dataForCountryLineChart=this.getDataForCountryLineChart();
        this.dataForCountryLineChart.xAxisLabel="Dates";        
        this.selectedCoutryData={country:this.getCountryName(),
                                  numberOfEntries:this.dataForCountryLineChart.data.length,
                                  totalNumberOfMedals:this.getTotalMedals(),
                                  totalNumberOfAthletes:this.getTotalAthletes()};

      }
    });
  }

    // destroy the subscritions to avoid memory leaks.
  ngOnDestroy(): void {
    this.olympicSub.unsubscribe();
    this.countrySub.unsubscribe();
  }

  // get te data (labels and data) for the line chart 
  getDataForCountryLineChart():DataForLineChart{
    var medalsPerYear:number[]=[];
    var years:number[]=[];
    var foundIndex!:number;
    if (this.olympicCountryData!=undefined){
      this.olympicCountryData.participations.forEach(participation => {
        if (years.length>0)
        {
          foundIndex=years.findIndex((element) => element == participation.year);
          if (foundIndex===-1)
          {
            years.push(participation.year);            
            medalsPerYear.push(participation.medalsCount); 
          }
          else{
            medalsPerYear[foundIndex]+=participation.medalsCount;
          }
        }else{
          years.push(participation.year);            
          medalsPerYear.push(participation.medalsCount); 
        }
      });      
    }
    return {labels:years, data:medalsPerYear};
  }

  // get the country name from the olympic object
  getCountryName():string{
    let name="";
    if (this.olympicCountryData!=undefined){
      name = this.olympicCountryData.country;
    }
    return name;
  }

  // get the total of medals from the olympic object
  getTotalMedals():number
  {
    let totalMedals=0;
    if (this.olympicCountryData!=undefined){
      totalMedals= this.olympicCountryData?.participations.reduce<number>((total, element)=>total+(element.medalsCount),0);
    }
    return totalMedals;
  }

  // get the total of athletes from the olympic object
  getTotalAthletes():number
  {
    let totalAthletes =0;
    if (this.olympicCountryData!=undefined){
      totalAthletes= this.olympicCountryData?.participations.reduce<number>((total, element)=>total+(element.athleteCount),0);
    }
    return totalAthletes;
  }
  
}
