import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../category.service';
import { CategoryRecieved } from '../models/category-recieved';
import { Product } from '../models/product';
import { ProductRecieved } from '../models/product-recieved';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products$?: Observable<ProductRecieved[] | Product[]>
  categories$?: Observable<CategoryRecieved[]>
  categoryKey?: string | null

  constructor(
    private route: ActivatedRoute,
    private productServie: ProductService,
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      let category = params.get('category');
      if (category) this.products$ = this.productServie.getProductsByCategoryFilter(category);
      else this.products$ = this.productServie.getProducts();
    })
    this.categories$ = this.categoryService.getCategories();
  }
}
