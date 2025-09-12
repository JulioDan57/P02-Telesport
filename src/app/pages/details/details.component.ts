import { Component, inject, OnInit, signal, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empty, Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic, DataPerCountry } from 'src/app/core/models/Olympic';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { DataForLineChart } from 'src/app/core/models/Chart.model';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})

export class DetailsComponent implements OnInit, OnDestroy {
  consoleIsEnabled:boolean=false;
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

    //this.olympicService.getOlympicByCountry(this.countryId).subscribe(data =>this.olympicCountryData=data);

    this.olympics$ = this.olympicService.getOlympics();
    this.olympicSub=this.olympics$.subscribe((data:Olympic[])=> {
      this.olympicData=data;
      if (data !=null)
      {
        if (this.consoleIsEnabled)
        {
          console.log("Number of olympic countries into the json file : " + this.olympicData.length);   
          console.log("Country for search : " + this.countryId);
        }
        
        this.selectedCoutryData=null;
        this.olympicCountryData = this.olympicData.find(olympic=> this.toLowerCase(this.countryId)===this.toLowerCase(olympic.country));
        if (this.olympicCountryData!=null){

          this.selectedCoutryData={country:this.getCountryName(),
                                   numberOfEntries:this.olympicCountryData.participations.length,
                                   totalNumberOfMedals:this.getTotalMedals(),
                                   totalNumberOfAthletes:this.getTotalAthletes()};
          this.dataForCountryLineChart=this.getDataForCountryLineChart();
          this.dataForCountryLineChart.xAxisLabel="Dates";
        }
      }
    });  

  }
    // destroy the subscritions to avoid memory leaks.
  ngOnDestroy(): void {
    this.olympicSub.unsubscribe();
    this.countrySub.unsubscribe();
  }


  getDataForCountryLineChart():DataForLineChart{
    var medalsPerYear:number[]=[];
    var years:number[]=[];
    if (this.olympicCountryData!=undefined){
      this.olympicCountryData.participations.forEach(participation => {
        medalsPerYear.push(participation.medalsCount); 
        years.push(participation.year);            
      });      
    }
    return {labels:years, data:medalsPerYear};
  }


  getCountryName():string{
    let name="";
    if (this.olympicCountryData!=undefined){
      name = this.olympicCountryData.country;
    }
    return name;
  }

  getTotalMedals():number
  {
    let totalMedals=0;
    if (this.olympicCountryData!=undefined){
      totalMedals= this.olympicCountryData?.participations.reduce<number>((total, element)=>total+(element.medalsCount),0);
    }
    return totalMedals;
  }

  getTotalAthletes():number
  {
    let totalAthletes =0;
    if (this.olympicCountryData!=undefined){
      totalAthletes= this.olympicCountryData?.participations.reduce<number>((total, element)=>total+(element.athleteCount),0);
    }
    return totalAthletes;
  }
  
  getYearAsArray():number[]
  {
    let years:number[]=[];
    if (this.olympicCountryData!=undefined){
      this.olympicCountryData.participations.forEach(participation => {
        years.push(participation.year);            
      });      
    }
    return years;
  }

  getMedalsPerYearAsArray():number[]{
    let medalsPerYear:number[]=[];
    if (this.olympicCountryData!=undefined){
      this.olympicCountryData.participations.forEach(participation => {
        medalsPerYear.push(participation.medalsCount);            
      });      
    }
    return medalsPerYear;   
  }

}
