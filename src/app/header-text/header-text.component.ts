import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-text',
  standalone: false,
  templateUrl: './header-text.component.html',
  styleUrl: './header-text.component.scss'
})
export class HeaderTextComponent implements OnInit{
  public text!: string;
  public  backgroundColorRGB!:Array<number>;

  ngOnInit():void{
    this.text= 'Name of the country';
    this.backgroundColorRGB=[255,0,0];
  }
}
