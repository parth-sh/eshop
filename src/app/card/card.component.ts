import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'product-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() title?: string;
  @Input() price?: number;
  @Input() imageUrl?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
