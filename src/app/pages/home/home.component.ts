import { Component, OnDestroy, OnInit, inject  } from '@angular/core';
import { empty, Observable, of, Subscription } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic, DataPerCountry, JsonReadingStatus } from 'src/app/core/models/Olympic';
import { ActivatedRoute, Router } from '@angular/router';
import { DataForPieChart } from 'src/app/core/models/Chart.model';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    standalone: false
})

export class HomeComponent implements OnInit, OnDestroy {
  public olympics$!: Observable<Olympic[]>;
  public olympicData!: Olympic[];
  public numberOfJOs:number=0;
  public numberOfCountries:number=0;
  public sliceIndexSelected=-1;
  public dataForCountriesPieChart!:DataForPieChart;
  private olympicSub!: Subscription;
  public serverFailed:boolean=false;
  public serverError:string="";
  public serverMessageError:String=""; 
  private errorSub!: Subscription;

  constructor(private olympicService: OlympicService, private router: Router) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
    this.sliceIndexSelected=-1;
    
    this.errorSub = this.olympicService.getJsonReadingStatus().subscribe((data:JsonReadingStatus) => {
      this.serverFailed = data.failed;
      this.serverError=data.message;
      if (this.serverError=="404")
      {
        this.serverMessageError="The ressource requested could not be found on this server.";
      }
      else
      {
        this.serverMessageError="Thes server encounteresd an error and could not complete your request.";
      }
    });

    this.olympicSub = this.olympics$.subscribe((data:Olympic[])=> {
       this.olympicData=data;
       if (data !=null)
       {
          this.dataForCountriesPieChart=this.getDataForCountriesPieChart();
          this.numberOfJOs=this.getNumberOfJOs();
          this.numberOfCountries=this.olympicData.length;
       }

    },);
  }

  // destroy the subscrition to avoid memory leaks.
  ngOnDestroy(): void {
    this.olympicSub.unsubscribe();
    this.errorSub.unsubscribe();
  }

  // send to the page of the clicked country
  showClickedCountryData(countryIndex:number){
    this.sliceIndexSelected=countryIndex;
    if (countryIndex!=-1)
    {
      this.router.navigate(['/details'+'/'+  this.dataForCountriesPieChart.labels[countryIndex]]);
    }
  }

  // get te data (labels and data) for the pie chart 
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

  // get the total of JOs 
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
