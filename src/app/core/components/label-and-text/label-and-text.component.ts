import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-and-text',
  standalone: false,
  templateUrl: './label-and-text.component.html',
  styleUrl: './label-and-text.component.scss'
})
export class LabelAndTextComponent implements OnInit{
  @Input() label: string = 'Number of entries';
  @Input() text: string ='30';
  @Input() numericValue: number=0;
  //public  backgroundColorRGB!:Array<number>;

  ngOnInit():void{
    //this.label= 'Number of entries';
    //this.text= '30';
    //this.backgroundColorRGB=[255,0,0];
  }  
  //@Input() setLabelAndText(newLabel :string, newText:string){
  //  this.label=newLabel;
  //  this.text=newText;
  //}

  //@Input() setLabelAndNumber(newLabel :string, newNumber:number){
  //  this.label=newLabel;
  //  this.text=newNumber.toString();
  //}
  loadNumericValue(){
    this.text="50";//this.numericValue.toString();
  }

}
