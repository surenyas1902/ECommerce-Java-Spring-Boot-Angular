import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';
  
  constructor(private http: HttpClient) { }

  getProductList(pageNumber: number, pageSize: number, categoryId: number) : Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${pageNumber}&size=${pageSize}`;
    return this.http.get<GetResponseProducts>(searchUrl);
  }

  getProductCategories() : Observable<ProductCategory[]> {
    return this.http.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  searchProducts(pageNumber: number, pageSize: number, keyword: string | null) : Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${pageNumber}&size=${pageSize}`;
    return this.http.get<GetResponseProducts>(searchUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.http.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductData(prodId: number) : Observable<Product> {
    const searchUrl = `${this.baseUrl}/${prodId}`;
    return this.http.get<Product>(searchUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[]
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}
