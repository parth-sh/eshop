import { Component, Input, OnInit } from '@angular/core';
import { ProductRecieved } from '../models/product-recieved';

@Component({
  selector: 'product-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() product?: ProductRecieved;

  constructor() { }

  ngOnInit(): void { }

}
