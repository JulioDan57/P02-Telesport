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

  ngOnInit():void{
  }  
}
