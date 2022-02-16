import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category.service';
import { CategoryRecieved } from 'src/app/models/category-recieved';
import { ProductService } from '../../product.service';
import { Product } from 'src/app/models/product';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$?: Observable<CategoryRecieved[]>;
  productId?: string;
  product: Product = { title: "", price: 0, category: "", imageUrl: "" };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories()
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id') as string
    })
    // take is a shortcut for unsubscribe cause subscribe will only take 1 value
    if (this.productId) this.productService.getProduct(this.productId).pipe(take(1)).subscribe(x => this.product = x)
  }

  save(product: Product) {
    if (this.productId) this.productService.updateProduct(this.productId, this.product)
    else this.productService.craete(product)

    this.router.navigateByUrl('/admin/products');
  }

  delete() {
    if (!confirm('Sure to delete this product ?')) return;
    if (this.productId) this.productService.deleteProduct(this.productId);

    this.router.navigateByUrl('/admin/products');
  }

  // TODO: add filter and sorting searching feature
}
