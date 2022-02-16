import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { ProductRecieved } from '../../models/product-recieved';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {

  displayedColumns: string[] = ['title', 'price', 'category', 'actions'];
  dataSource: ProductRecieved[] = []

  constructor(private producService: ProductService) { }

  ngOnInit(): void {
    this.producService.getProducts().subscribe(products => { this.dataSource = products });
  }

}
