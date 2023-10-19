import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  // templateUrl: './product-list.component.html',
  // templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  // set up a property for array of products
  products: Product[] = []
  currentCategoryId: number = 1;
  previousCategoryId: number = 1;
  currentCategoryName: string = "";
  searchMode: boolean = false;

  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5; // 1 page, display 5 products
  theTotalElements: number = 0;

  previousKeyword: string = "";


  // inject our ProductService
  constructor(private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute) { }

  // Similar to @PostConstruct
  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
    this.listProducts();
  }

  // declare method
  listProducts() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode){
      this.handleSearchProducts();
    } else{
      this.handleListProducts();
    }
  
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword')!;

    // if we have a different keyword than previous
    // then set thePageNumber to 1

    if (this.previousKeyword != theKeyword){
      this.thePageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    console.log(`keyword=${theKeyword}, thePageNumber=${this.thePageNumber}`)

    // now search for the product using keyword
    this.productService.searchProductsPaginate(
      this.thePageNumber - 1,
      this.thePageSize,
      theKeyword).subscribe(this.processResult());
  }

  handleListProducts(){
    // check if "id" parameter is available
    const idParam = this.route.snapshot.paramMap.get('id');

    if (idParam !== null && idParam !== undefined) {
      // get the "id" param string, convert to a number using the "+" symbol
      this.currentCategoryId = +idParam;

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;

    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = 'Books';
    }

    //
    // check if we have a different category than previous
    // note: angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set thePageNumber back to 1
    if (this.previousCategoryId != this.currentCategoryId){
      this.thePageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;

    console.log(`currentCategoryId=${this.currentCategoryId}, thePageNumber=${this.thePageNumber}`);

    // now get the products for the given category id
    this.productService.getProductListPaginate(
      // pagination component: pages are 1 based, Spring Data REST: pages are 0 based (front-end need to match with back end)
      this.thePageNumber - 1, 
      this.thePageSize,
      this.currentCategoryId).subscribe(this.processResult());


  }

  updatePageSize(pageSize: string){
    // set page size based on parameter value 
    // convert string to number using + operator
    this.thePageSize = +pageSize;
    this.thePageNumber = 1;
    this.listProducts();

  }

  addToCart(theProduct: Product) {
    
    console.log(`Adding to cart: ${theProduct.name}, ${theProduct.unitPrice}`);

    // TODO ... do the real work
    let theCartItem = new CartItem(theProduct.id, theProduct.name, theProduct.imageUrl, theProduct.unitPrice);

    this.cartService.addToCart(theCartItem);
  }

  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      // Spring data REST: pages are 0 based
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theTotalElements = data.page.totalElements;
    };

  }

}
