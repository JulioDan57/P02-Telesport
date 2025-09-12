import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-label-and-text',
  standalone: false,
  templateUrl: './label-and-text.component.html',
  styleUrl: './label-and-text.component.scss'
})

export class LabelAndTextComponent implements OnInit{
  // input label for LabelAndTextComponent
  @Input() label: string = '';
  // input text for LabelAndTextComponent
  @Input() text: string ='';

  ngOnInit():void{
  }  
}
