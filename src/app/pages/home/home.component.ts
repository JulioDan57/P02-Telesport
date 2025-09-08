import { Component, OnInit, inject  } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic, DataPerCountry } from 'src/app/core/models/Olympic';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  consoleIsEnabled:boolean=false;
  public olympics$!: Observable<Olympic[]>;
  public olympicData!: Olympic[];
  public olympicCountries:string[]=[];;
  public medalsPerCountry:number[]=[];
  public dataPerCountry:DataPerCountry[]=[];
  public numberOfJOs:number=0;
  public numberOfCountries:number=0;
  public sliceIndexSelected=-1;
  public sliceIndexMouseOvered=-1;

  private router = inject(Router);

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.sliceIndexSelected=-1;
    this.sliceIndexMouseOvered=-1;
    
    this.olympics$.subscribe((data:Olympic[])=> {
       this.olympicData=data;
       if (data !=null)
       {
        if (this.consoleIsEnabled)
        {
          console.log("Number of olympic countries into the json file : " + this.olympicData.length);   
        }
        this.countJOsAndCountries();
       }
    });
  }

  countJOsAndCountries()
  {
    let jOYears:number[]=[];
    let accumMedals=0;
    let accumAthletes=0;
    let numberOfParticipations=0;
    let medalsPerYear:number[]=[];
    let years:number[]=[];

    if (this.olympicData.length)
    {
      this.olympicCountries= new Array(this.olympicData.length);
      this.medalsPerCountry= new Array(this.olympicData.length);
      this.dataPerCountry=new Array(this.olympicData.length);
      for(let i=0; i<this.olympicData.length; i++)
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
        this.olympicCountries[i]=this.olympicData[i].country;
        this.medalsPerCountry[i]=accumMedals;
        let basicDataPerCountry={country:this.olympicCountries[i],
                                numberOfEntries:numberOfParticipations,
                                totalNumberOfMedals:accumMedals,
                                totalNumberOfAthletes:accumAthletes,
                                years:years,
                                medalsPerYear:medalsPerYear};                                
        this.dataPerCountry[i]=basicDataPerCountry;
        if (this.consoleIsEnabled)
        {        
          console.log("data for country "+ i +" : country " + basicDataPerCountry.country +", Entries " + 
                                                      basicDataPerCountry.numberOfEntries+", Medals " + 
                                                      basicDataPerCountry.totalNumberOfMedals+", Athletes " +
                                                      basicDataPerCountry.totalNumberOfAthletes+", Years " +
                                                      basicDataPerCountry.years+", Medals per Year " +
                                                      basicDataPerCountry.medalsPerYear);
        }
      }
      this.numberOfJOs=jOYears.length;
      this.numberOfCountries=this.olympicData.length;
      if (this.consoleIsEnabled)
      {
        console.log("Olypic countries : "+ this.olympicCountries);
        console.log("Medals per olympic country : "+this.medalsPerCountry);
        console.log("first country Name: "+ this.dataPerCountry[0].country);
        console.log("first country Entries: "+ this.dataPerCountry[0].numberOfEntries);
        console.log("first country Medals: "+ this.dataPerCountry[0].totalNumberOfMedals);
        console.log("first country Athletes: "+ this.dataPerCountry[0].totalNumberOfAthletes);
        console.log("first country Years: "+ this.dataPerCountry[0].years);
        console.log("first country Medals per year: "+ this.dataPerCountry[0].medalsPerYear);
      }
    }
  }

  showClickedCountryData(countryIndex:number){
    this.sliceIndexSelected=countryIndex;
    if (countryIndex!=-1)
    {
      console.log("data for selected country : country " + 
                  this.dataPerCountry[countryIndex].country +", Entries " + 
                  this.dataPerCountry[countryIndex].numberOfEntries+", Medals " + 
                  this.dataPerCountry[countryIndex].totalNumberOfMedals+", Athletes " +
                  this.dataPerCountry[countryIndex].totalNumberOfAthletes+", Years " +
                  this.dataPerCountry[countryIndex].years+", Medals per Year " +
                  this.dataPerCountry[countryIndex].medalsPerYear);
      this.router.navigate(['/details'+'/'+  this.dataPerCountry[countryIndex].country]);
    }
    else
    {
      console.log("Bad country index");
    }
  }
}
