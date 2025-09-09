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
  consoleIsEnabled:boolean=true;
  public olympics$!: Observable<Olympic[]>;
  public olympicData!: Olympic[];
  public olympicCountries:string[]=[];;
  public medalsPerCountry:number[]=[];
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
        this.generateData();
       }
    });
  }

  // send to the page of the clicked country
  showClickedCountryData(countryIndex:number){
    this.sliceIndexSelected=countryIndex;
    if (countryIndex!=-1)
    {
      if (this.consoleIsEnabled){
        console.log("selected country : " + this.olympicCountries[countryIndex]);
      }
      this.router.navigate(['/details'+'/'+  this.olympicCountries[countryIndex]]);
    }
    else
    {
      console.log("Bad country index");
    }
  }

  // load all data for pie chart (visualization and interaction), for title and for infomations labels
  generateData() {
    var jOYears: number[] = [];
    this.olympicCountries= [];
    this.medalsPerCountry= [];

    this.olympicData.map(olympic => {
      let totalMedals = 0;
        // count medals per country.
      olympic.participations.forEach(participation => totalMedals += participation.medalsCount);

      this.olympicCountries.push(olympic.country);
      this.medalsPerCountry.push(totalMedals);
    });

    this.olympicData.forEach(olympic => {
      olympic.participations.forEach(participation => {
        // in case of year is not present add it.
        if(!jOYears.find(year => participation.year === year)) {
          jOYears.push(participation.year);
        }
      })
    });

    this.numberOfJOs=jOYears.length;
    this.numberOfCountries=this.olympicData.length;
  }  
}
