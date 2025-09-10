import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { empty, Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic, DataPerCountry } from 'src/app/core/models/Olympic';
import { CommonModule, LowerCasePipe } from '@angular/common';

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
  public selectedCoutryData: DataPerCountry = {country:"None",
                              numberOfEntries:0,
                              totalNumberOfMedals:0,
                              totalNumberOfAthletes:0,
                              years:[2001, 2002],
                              medalsPerYear: [45, 50]};
  public isAValidCountry=false;  

  public lowerCasePipe = inject(LowerCasePipe);
  toLowerCase(value: string): string {
    return this.lowerCasePipe.transform(value);
  }
  
  private route=inject(ActivatedRoute);

  countryId=signal<string>("");

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    const params=this.route.snapshot.params;
    this.countryId.set(params['id']? params['id'] :"");
    this.olympics$ = this.olympicService.getOlympics();
    let nameToSearch=this.countryId().toString();
    
    this.olympics$.subscribe((data:Olympic[])=> {
      this.olympicData=data;
      if (data !=null)
      {
        if (this.consoleIsEnabled)
        {
          console.log("Number of olympic countries into the json file : " + this.olympicData.length);   
          console.log("Country for search : " + this.countryId());
        }
        this.isAValidCountry=this.generateDataForCountry(nameToSearch);
       
      }
    });  

  }

  
  // load all data for the line chart, the title and the informations labels, by using find and forEach. 
  // This function uses the country name as search parameter. 
  generateDataForCountry(countryName:string):boolean {
    let medalsPerYear:number[]=[];
    let years:number[]=[];
    let accumMedals=0;
    let accumAthletes=0;      
    let numberOfParticipations=0;
    let lowerCaseName=this.toLowerCase(countryName);
    let isFound=false;

    const olympicCountryData = this.olympicData.find(olympic=> lowerCaseName===this.toLowerCase(olympic.country));

    if (olympicCountryData!= undefined)
    {
      numberOfParticipations=olympicCountryData.participations.length;
        olympicCountryData.participations.forEach(participation => {
          accumMedals += participation.medalsCount;
          accumAthletes += participation.athleteCount;
          medalsPerYear.push(participation.medalsCount);
          years.push(participation.year);            
        });
        let basicDataPerCountry={country:countryName,
                                numberOfEntries:numberOfParticipations,
                                totalNumberOfMedals:accumMedals,
                                totalNumberOfAthletes:accumAthletes,
                                years:years,
                                medalsPerYear:medalsPerYear};         
        this.selectedCoutryData=basicDataPerCountry;        
        isFound=true;
    }

    if (this.consoleIsEnabled)
    {
      if (isFound){
        console.log("Country found");
        console.log("found country Name: "+ this.selectedCoutryData.country);
        console.log("found country Entries: "+ this.selectedCoutryData.numberOfEntries);
        console.log("found country Medals: "+ this.selectedCoutryData.totalNumberOfMedals);
        console.log("found country Athletes: "+ this.selectedCoutryData.totalNumberOfAthletes);
        console.log("found country Years: "+ this.selectedCoutryData.years);
        console.log("found country Medals per year: "+ this.selectedCoutryData.medalsPerYear);
      }else{
        console.log("found not found");
      }
    }

    return isFound;
  }      

  // load all data for the line chart, the title and the informations labels, by using classic for. 
  // This function uses the country name as search parameter. 
    loadDataForCountry(countryName:string):boolean
  {
    let accumMedals=0;
    let accumAthletes=0;
    let numberOfParticipations=0;
    let medalsPerYear:number[]=[];
    let years:number[]=[];
    let lowerCaseName=this.toLowerCase(countryName);
    let isFound=false;

    if (lowerCaseName.length===0)
    {
      return isFound;
    }

    if (this.olympicData.length)
    {
      for(let i=0; i<this.olympicData.length; i++)
      {
        if(lowerCaseName===this.toLowerCase(this.olympicData[i].country))
        {
          numberOfParticipations=this.olympicData[i].participations.length;
          years=new Array(numberOfParticipations);
          medalsPerYear=new Array(numberOfParticipations);
          accumMedals=0;
          accumAthletes=0;
          for(let j=0; j<numberOfParticipations; j++)
          {
            accumMedals+= this.olympicData[i].participations[j].medalsCount;
            accumAthletes+= this.olympicData[i].participations[j].athleteCount;
            years[j]=this.olympicData[i].participations[j].year;
            medalsPerYear[j]=this.olympicData[i].participations[j].medalsCount;
          }

          let basicDataPerCountry={country:this.olympicData[i].country,
                                  numberOfEntries:numberOfParticipations,
                                  totalNumberOfMedals:accumMedals,
                                  totalNumberOfAthletes:accumAthletes,
                                  years:years,
                                  medalsPerYear:medalsPerYear};                                
          
          this.selectedCoutryData=basicDataPerCountry;
          isFound=true;
          i=this.olympicData.length;
        }
      }
    }
    if (this.consoleIsEnabled)
    {
      if (isFound){
        console.log("Country found");
        console.log("found country Name: "+ this.selectedCoutryData.country);
        console.log("found country Entries: "+ this.selectedCoutryData.numberOfEntries);
        console.log("found country Medals: "+ this.selectedCoutryData.totalNumberOfMedals);
        console.log("found country Athletes: "+ this.selectedCoutryData.totalNumberOfAthletes);
        console.log("found country Years: "+ this.selectedCoutryData.years);
        console.log("found country Medals per year: "+ this.selectedCoutryData.medalsPerYear);
      }else{
        console.log("found not found");
      }
    }

    return isFound;
  }
  
}
