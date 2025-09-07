import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit {
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

  constructor() { }

  ngOnInit(): void {
    //countries= new Array(any|]);
    //countries=new
  }

}
