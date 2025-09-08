import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-text',
  standalone: false,
  templateUrl: './header-text.component.html',
  styleUrl: './header-text.component.scss'
})

export class HeaderTextComponent implements OnInit{
  @Input() text: string ='Name of the country';
  backgroundColorRGB!:Array<number>;

  ngOnInit():void{
  }
  
  public setText(newText:string){
    this.text=newText;
  }
}
