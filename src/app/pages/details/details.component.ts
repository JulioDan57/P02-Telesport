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
    public olympics$!: Observable<Olympic[]>;//= of ([]);  
    public olympicData!: Olympic[];
    public dataPerCountry:DataPerCountry[]=[];
    public selectedCoutryData: DataPerCountry = {country:"B",
                                numberOfEntries:0,
                                totalNumberOfMedals:1,
                                totalNumberOfAthletes:2,
                                years:[2001, 2002, 2003, 2004],
                                medalsPerYear: [45, 50, 60, 70]};
    public isAValidCountry=false;  

  public lowerCasePipe = inject(LowerCasePipe);
  toLowerCase(value: string): string {
    return this.lowerCasePipe.transform(value);
  }
                                
                                /* 
  countries:Array<any>=[];
  id: number=0;
  createCountryDetails(name: string, role: string):void
  {
    const country={
      id:this.id++,
      name,
      role,
    };
    this.countries.push(country);
          console.log(country);
  }
*/
  private route=inject(ActivatedRoute);


  //countryId=signal<string | undefined>(undefined);
  countryId=signal<string>("");

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    const params=this.route.snapshot.params;
    this.countryId.set(params['id']? params['id'] :"");
    this.olympics$ = this.olympicService.getOlympics();
    
    let nameToSearch=this.countryId().toString();
    
    /*this.olympics$.subscribe({
    next(someRandomData) { console.log(someRandomData); },
    complete() { console.log('Finished sequence'); }});*/
    this.olympics$.subscribe((data:Olympic[])=> {
       //this.someRandomData=data;
       this.olympicData=data;
       if (data !=null)
       {
        console.log(this.olympicData);   
        this.isAValidCountry=this.loadDataForCountry(nameToSearch);
        console.log(this.countryId());
       }
      });    

  }



loadDataForCountry(countryName:string):boolean
{
    let countries:string[]=[];
    let jOYears:number[]=[];
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

    console.log("nalme for search :"+countryName);
    if (this.olympicData.length)
    {
      //this.dataPerCountry=new Array(this.olympicData.length);
      for(let i=0; i<this.olympicData.length; i++)
      {
        if(lowerCaseName===this.toLowerCase(this.olympicData[i].country))
        {
          isFound=true;
          numberOfParticipations=this.olympicData[i].participations.length;
          years=new Array(numberOfParticipations);
          medalsPerYear=new Array(numberOfParticipations);

          accumMedals=0;
          accumAthletes=0;
          for(let j=0; j<numberOfParticipations; j++)
          {
            accumMedals+= this.olympicData[i].participations[j].medalsCount;
            accumAthletes+= this.olympicData[i].participations[j].athleteCount;
            if (jOYears.length>0)
            {
              if (jOYears.indexOf(this.olympicData[i].participations[j].year)===-1)
              {
                jOYears.push(this.olympicData[i].participations[j].year);  
              }
            }
            else
            {
              jOYears.push(this.olympicData[i].participations[j].year);
            }
            years[j]=this.olympicData[i].participations[j].year;
            medalsPerYear[j]=this.olympicData[i].participations[j].medalsCount;
          }
          console.log(years);
          console.log(medalsPerYear);
          let basicDataPerCountry={country:this.olympicData[i].country,
                                  numberOfEntries:numberOfParticipations,
                                  totalNumberOfMedals:accumMedals,
                                  totalNumberOfAthletes:accumAthletes,
                                  years:years,
                                  medalsPerYear:medalsPerYear};                                
          console.log(basicDataPerCountry);
          this.selectedCoutryData=basicDataPerCountry;
          i=this.olympicData.length;
        }
      }
      console.log("found country Name: "+ this.selectedCoutryData.country);
      console.log("found country Entries: "+ this.selectedCoutryData.numberOfEntries);
      console.log("found country Medals: "+ this.selectedCoutryData.totalNumberOfMedals);
      console.log("found country Athletes: "+ this.selectedCoutryData.totalNumberOfAthletes);
      console.log("found country Years: "+ this.selectedCoutryData.years);
      console.log("found country Medals per year: "+ this.selectedCoutryData.medalsPerYear);

    }
    return isFound;

  }
  

}
