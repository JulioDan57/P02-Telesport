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
  consoleIsEnabled:boolean=true;
  public olympics$!: Observable<Olympic[]>; 
  public olympicData!: Olympic[];
  public dataPerCountry:DataPerCountry[]=[];
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
          //let test=this.data;
          //console.log("Test map : "+test.length + " | "  + test[0].name +" | "+ test[0].value);
        }
        this.isAValidCountry=this.loadDataForCountry(nameToSearch);
       
      }
    });    
  }

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
  
  /*
  get data(): {"name": string, "value": number}[] {
    return this.olympicData.map(olympic => {
      var totalMedals = 0;
      // On additionne le nombre de médailles de chaque participation pour obtenir le nombre total de médailles pour un olympic.
      olympic.participations.forEach(participation => totalMedals += participation.medalsCount);
      return {"name": olympic.country, "value": totalMedals};
    });
  }*/

}
