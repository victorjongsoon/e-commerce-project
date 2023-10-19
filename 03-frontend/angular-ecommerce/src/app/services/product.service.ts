import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs'; // reative javascript
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {




  private baseUrl = "http://localhost:8080/api/products";
  private categoryUrl = "http://localhost:8080/api/product-category";


  constructor(private httpClient: HttpClient ) { }
  // : Observable<Product> means we are returning one product, [] means a list of products
  getProduct(theProductId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${theProductId}`;

    return this.httpClient.get<Product>(productUrl);
  }

  getProductListPaginate(
    thePage: number, 
    thePageSize: number, 
    theCategoryId: number): Observable<GetResponseProducts> {

    // need to built URL based on category id, page and size
    const seachUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`+ 
    `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(seachUrl);
  }

  // Return as observable, map to JSON data from Spring Data REST to Product Array
  getProductList(theCategoryId: number): Observable<Product[]> {

    // need to built URL based on category id
    const seachUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(seachUrl)
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
    // need to built URL based on the keyword
    const seachUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;

    return this.getProducts(seachUrl)
  }

  private getProducts(seachUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(seachUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  searchProductsPaginate(
    thePage: number, 
    thePageSize: number, 
    theKeyword: string): Observable<GetResponseProducts> {

    // need to built URL based on keyword, page and size
    const seachUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`+ 
    `&page=${thePage}&size=${thePageSize}`;

    return this.httpClient.get<GetResponseProducts>(seachUrl);
  }

  getProductCategories(): Observable<ProductCategory[]>{
    // return an observable, maps the JSON data from Spring Data REST to ProductCategory array
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    )
  }




}

interface GetResponseProducts{
  _embedded: {
    products : Product[];
  },
  page:{
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseProductCategory{
  // unwraps the JSON from Spring Data REST _embedded entry
  _embedded: {
    productCategory : ProductCategory[];
  }
}