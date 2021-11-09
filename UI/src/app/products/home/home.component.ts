import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: Array<Product> = new Array<Product>();
  currentCategoryId: number = 1;
  searchMode: boolean = false;
  previousCategoryId: number = 1;

  pageNumber: number = 1;
  ddPageSize: number = 5;
  pageSize: number = this.ddPageSize;
  totalProducts: number = 0;

  previousKeyword: string | null = ""; 
  

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => this.showProducts());
  }

  showProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    if (this.searchMode) {
      this.searchProducts();
    }
    else {
      this.listProducts();
    }
  }

  searchProducts() {
    const keyword = this.route.snapshot.paramMap.get('keyword');
    if (this.previousKeyword != keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;
    this.productService.searchProducts(this.pageNumber - 1, this.pageSize, keyword)
    .subscribe(data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalProducts = data.page.totalElements;
    });
  }

  listProducts() {
    let categoryId = this.route.snapshot.paramMap.get('id');

    if (!categoryId) {
      this.currentCategoryId = 1;
    }
    else {
      this.currentCategoryId = Number.parseInt(categoryId);
    }

    if (this.previousCategoryId != this.currentCategoryId) {
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`current Caegory=${this.currentCategoryId}, pageNumber = ${this.pageNumber}`)

    this.productService.getProductList(this.pageNumber - 1, this.pageSize, this.currentCategoryId)
      .subscribe(data => {
        this.products = data._embedded.products;
        this.pageNumber = data.page.number + 1;
        this.pageSize = data.page.size;
        this.totalProducts = data.page.totalElements;
      });
  }

  pageChange(event: PageChangedEvent) {
    this.pageNumber = event.page;
  }

  pageSizeChange() {
    this.pageSize = this.ddPageSize;
    this.pageNumber = 1;
    this.showProducts();
  }

  addToCart(product: Product) {
    console.log(`Adding to Cart: ${product.name}, ${product.unitPrice}`);
  }
}
