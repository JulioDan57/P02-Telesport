import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-text',
  standalone: false,
  templateUrl: './header-text.component.html',
  styleUrl: './header-text.component.scss'
})

export class HeaderTextComponent implements OnInit{
  // input text for HeaderTextComponent
  @Input() text: string =''; 
  
  ngOnInit():void{
  }
}
