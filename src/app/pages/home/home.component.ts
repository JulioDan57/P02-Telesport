import { Component, OnInit } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
//import  'src/app/core/models/Olympic';
import { Olympic, DataPerCountry } from 'src/app/core/models/Olympic';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})
export class HomeComponent implements OnInit {
  public olympics$!: Observable<Olympic[]>;//= of ([]);    //public olympics$: Observable<any> = of(null);
  //public olympics$: Observable<any> = of(null);
  public olympicData!: Olympic[];
  public olympicCountries:string[]=[];;
  public medalsPerCountry:number[]=[];
  public dataPerCountry:DataPerCountry[]=[];

  //public athletesPerCountry:number[]=[];
  public numberOfJOs:number=0;
  public numberOfCountries:number=0;

  public someRandomData!: any[];
  public id0!:number;
  public id1!:number;
  public city0!:string;
  public city1!:string;
  public size:number=0;

  public count:number=0;
  public sliceIndexSelected=-1;
  public sliceIndexMouseOvered=-1;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    let mainSize:number;
    let secSize:number;
    this.olympics$ = this.olympicService.getOlympics();
    
    /*this.olympics$.subscribe({
    next(someRandomData) { console.log(someRandomData); },
    complete() { console.log('Finished sequence'); }});*/
    this.olympics$.subscribe((data:Olympic[])=> {
       //this.someRandomData=data;
       this.olympicData=data;
       if (data !=null)
       {
        mainSize=this.olympicData.length;
        console.log(mainSize);   
        console.log(this.olympicData);   
        this.countJOsAndCountries();
       }
       /*for(let i=0; i<mainSize; i++)
       {
        let secSize=this.someRandomData[i].participations.length;
        console.log(secSize);   
        this.olympicCountries[i].id=this.someRandomData[i].id;  
        this.olympicCountries[i].country=this.someRandomData[i].country;
        this.olympicCountries[i].participations=new Array(secSize);
        
        for(let j=0; j<secSize; j++)
        {
          this.olympicCountries[i].participations[j].id=this.someRandomData[i].participations[j].id;
          this.olympicCountries[i].participations[j].year=this.someRandomData[i].participations[j].year;
          this.olympicCountries[i].participations[j].city=this.someRandomData[i].participations[j].city;
          this.olympicCountries[i].participations[j].medalsCount=this.someRandomData[i].participations[j].medalsCount;
          this.olympicCountries[i].participations[j].athleteCount=this.someRandomData[i].participations[j].athleteCount;
        }
       }*/
       //mainSize=this.olympicCountries.length;
      // console.log("final size" + 5);   
      
      /*
       this.id0=this.someRandomData[0].id;
       this.id1=this.someRandomData[1].id;
       this.city0=this.someRandomData[0].participations[0].city;
       console.log(this.id0);
       console.log(this.id1);
       console.log(this.city0);
       this.size=this.someRandomData.length;
      console.log("size : "+ this.size);    
      if (this.size>0)
      {
        this.id0=this.someRandomData[0].id;
        this.id1=this.someRandomData[1].id;
        this.city1=this.someRandomData[1].participations[1].city;
        console.log(this.id0);
        console.log(this.id1);
        console.log(this.city1);
      }       */
    });


  }
  countJOsAndCountries()
  {
    let countries:string[]=[];
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
      //this.athletesPerCountry= new Array(this.olympicData.length);
      this.dataPerCountry=new Array(this.olympicData.length);
      for(let i=0; i<this.olympicData.length; i++)
      {
        numberOfParticipations=this.olympicData[i].participations.length;
        //this.dataPerCountry[i].years=new Array(numberOfParticipations);
        //this.dataPerCountry[i].medalsPerYear=new Array(numberOfParticipations);

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
        //this.dataPerCountry[i].totalNumberOfMedals=accumMedals;
        //this.dataPerCountry[i].totalNumberOfAthletes=accumAthletes;
        //this.dataPerCountry[i].numberOfEntries=numberOfParticipations;
        //this.athletesPerCountry[i]=accumAthletes;
        console.log(years);
        console.log(medalsPerYear);
        let basiDataPerCountry={country:this.olympicCountries[i],
                                numberOfEntries:numberOfParticipations,
                                totalNumberOfMedals:accumMedals,
                                totalNumberOfAthletes:accumAthletes,
                                years:years,
                                medalsPerYear:medalsPerYear};                                
        console.log(basiDataPerCountry);
        this.dataPerCountry[i]=basiDataPerCountry;
      }
      this.numberOfJOs=jOYears.length;
      this.numberOfCountries=this.olympicData.length;
      console.log(this.olympicCountries);
      console.log(this.medalsPerCountry);
      console.log("first country Name: "+ this.dataPerCountry[0].country);
      console.log("first country Entries: "+ this.dataPerCountry[0].numberOfEntries);
      console.log("first country Medals: "+ this.dataPerCountry[0].totalNumberOfMedals);
      console.log("first country Athletes: "+ this.dataPerCountry[0].totalNumberOfAthletes);
      console.log("first country Years: "+ this.dataPerCountry[0].years);
      console.log("first country Medals per year: "+ this.dataPerCountry[0].medalsPerYear);

    }
  }

  increaseCount(){
    this.count++;
  }
  showClickedCountryData(countryIndex:number){

    if (countryIndex!=-1)
    {
      console.log("first country Name: "+ this.dataPerCountry[countryIndex].country);
      console.log("first country Entries: "+ this.dataPerCountry[countryIndex].numberOfEntries);
      console.log("first country Medals: "+ this.dataPerCountry[countryIndex].totalNumberOfMedals);
      console.log("first country Athletes: "+ this.dataPerCountry[countryIndex].totalNumberOfAthletes);
      console.log("first country Years: "+ this.dataPerCountry[countryIndex].years);
      console.log("first country Medals per year: "+ this.dataPerCountry[countryIndex].medalsPerYear);      
    }
  }
}
