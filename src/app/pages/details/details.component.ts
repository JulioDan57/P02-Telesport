import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empty, Observable, of } from 'rxjs';
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

export class DetailsComponent implements OnInit {
  consoleIsEnabled:boolean=false;
  public olympics$!: Observable<Olympic[]>; 
  public olympicData!: Olympic[];
  private olympicCountryData:Olympic|undefined= undefined;
  public selectedCoutryData: DataPerCountry|null=null;
  public countryId="";
  public lowerCasePipe = inject(LowerCasePipe);
  public dataForLineChart: DataForLineChart|null=null;
  

  toLowerCase(value: string): string {
    return this.lowerCasePipe.transform(value);
  }
  
  constructor(private olympicService: OlympicService, private route:ActivatedRoute) {}

  ngOnInit(): void {
    const params=this.route.snapshot.params;
    this.countryId=params['id'];
    this.olympics$ = this.olympicService.getOlympics();

    this.olympics$.subscribe((data:Olympic[])=> {
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
                                   totalNumberOfAthletes:this.getTotalAthletes(),
                                   years:this.getYearAsArray(),
                                   medalsPerYear:this.getMedalsPerYearAsArray()};  
          //this.dataForLineChart=this.getDataForCountryLineChart();
        }
      }
    });  

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
