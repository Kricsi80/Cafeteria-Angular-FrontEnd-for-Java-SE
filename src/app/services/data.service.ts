import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Employee } from '../models/Employee';
import { Product } from '../models/Product';
import { EmployeeDebt } from '../models/EmployeeDebt';
import { ProductSold } from '../models/ProductSold';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private BASE_URL = 'http://localhost:8080/cafeteria/';
  private EMPLOYEE_URL = `${this.BASE_URL}EmployeeController`;
  private PRODUCTS_URL = `${this.BASE_URL}ProductController`;
  private CR_PURCH_URL = `${this.BASE_URL}PurchaseController`;
  private CR_PHP_URL = `${this.BASE_URL}PurchaseHasProductController`;

  constructor(private http: HttpClient) { }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.post<Employee[]>(this.EMPLOYEE_URL, null, {
      params: new HttpParams()
          .set('task', 'getAllEmployees')
  });
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.post<Product[]>(this.PRODUCTS_URL, null, {
      params: new HttpParams()
          .set('task', 'getAllProducts')
  });
  }

  getProductSoldByMonth(month: number): Observable<ProductSold[]> {
    return this.http.post<ProductSold[]>(this.PRODUCTS_URL, null, {
      params: new HttpParams()
      .set('task', 'getProductAmountSoldByMonth')
      .set('month', month.toString())
    });
  }

  getDebtOfEmployeesByMonth(month: number): Observable<EmployeeDebt[]> {
    return this.http.post<EmployeeDebt[]>(this.EMPLOYEE_URL, null, {
      params: new HttpParams()
      .set('task', 'getDebtOfAllEmployeesByMonth')
      .set('month', month.toString())
    });
  }

  createPurchase(employeeId: number): Observable<number> {
    return this.http.post<number>(this.CR_PURCH_URL, null, {
      params: new HttpParams()
          .set('task', 'createPurchase')
          .set('employeeId', employeeId.toString())
  });
  }

  createPurchaseHasProduct(prodId: number, amt: number, phPriceTotal: number, purchId: number): Observable<void> {
    return this.http.post<void>(this.CR_PHP_URL, null, {
      params: new HttpParams()
          .set('task', 'createPurchaseHasProduct')
          .set('productId', prodId.toString())
          .set('amount', amt.toString())
          .set('purchaseId', purchId.toString())
          .set('purchasePriceTotal', phPriceTotal.toString())
  });
  }
}
