import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-and-text',
  standalone: false,
  templateUrl: './label-and-text.component.html',
  styleUrl: './label-and-text.component.scss'
})
export class LabelAndTextComponent implements OnInit{
  public label!: string;
  public text!: string;
  public  backgroundColorRGB!:Array<number>;

  ngOnInit():void{
    this.label= 'Number of entries';
    this.text= '30';
    this.backgroundColorRGB=[255,0,0];
  }  

}
