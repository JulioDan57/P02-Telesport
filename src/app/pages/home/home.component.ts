import { Component, OnDestroy, OnInit, inject  } from '@angular/core';
import { empty, Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic, DataPerCountry } from 'src/app/core/models/Olympic';
import { ActivatedRoute, Router } from '@angular/router';
import { DataForPieChart } from 'src/app/core/models/Chart.model';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})

export class HomeComponent implements OnInit, OnDestroy {
  consoleIsEnabled:boolean=true;
  public olympics$!: Observable<Olympic[]>;
  public olympicData!: Olympic[];
  public numberOfJOs:number=0;
  public numberOfCountries:number=0;
  public sliceIndexSelected=-1;
  public dataForCountriesPieChart!:DataForPieChart;
  private router = inject(Router);
  private olympicSub!: Subscription;

  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.sliceIndexSelected=-1;
    
    this.olympicSub = this.olympics$.subscribe((data:Olympic[])=> {
       this.olympicData=data;
       if (data !=null)
       {
        this.dataForCountriesPieChart=this.getDataForCountriesPieChart();
        this.numberOfJOs=this.getNumberOfJOs();
        this.numberOfCountries=this.olympicData.length;
        if (this.consoleIsEnabled)
        {
          console.log("Number of olympic countries into the json file : " + this.olympicData.length);   
          console.log("data[0] : " + this.dataForCountriesPieChart.data[0]);   
          console.log("dataForCountriesPieChart : " + this.dataForCountriesPieChart);   

        }        
       }
    });
  }

  // destroy the subscritions to avoid memory leaks.
  ngOnDestroy(): void {
    this.olympicSub.unsubscribe();
  }

  // send to the page of the clicked country
  showClickedCountryData(countryIndex:number){
    this.sliceIndexSelected=countryIndex;
    if (countryIndex!=-1)
    {
      if (this.consoleIsEnabled){
        console.log("selected country : " + this.dataForCountriesPieChart.labels[countryIndex]);
      }
      this.router.navigate(['/details'+'/'+  this.dataForCountriesPieChart.labels[countryIndex]]);
    }
    else
    {
      console.log("Bad country index :"+ countryIndex);
    }
  }

  getDataForCountriesPieChart():DataForPieChart{
    var medalsPercountry:number[]=[];
    var countries:string[]=[];
    this.olympicData.forEach(olympic => {
      const totalMedals= olympic.participations.reduce<number>((total, element)=>total+(element.medalsCount),0);
      medalsPercountry.push(totalMedals);
      countries.push(olympic.country);
    });
    return {labels:countries, data:medalsPercountry};
  }

  getNumberOfJOs():number{
    var jOYears: number[] = [];    
    this.olympicData.forEach(olympic => {
      olympic.participations.forEach(participation => {
        // in case of year is not present add it.
        if(!jOYears.find(year => participation.year === year)) {
          jOYears.push(participation.year);
        }
      })
    });
    return jOYears.length;
  }
}
