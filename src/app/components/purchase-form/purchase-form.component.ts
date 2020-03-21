import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import { Employee } from '../../models/Employee';
import { Product } from '../../models/Product';
import { FormBuilder, FormGroup, FormArray, Validators, FormGroupDirective } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent implements OnInit {

  allEmployees: Employee[];
  allProducts: Product[];
  purchaseForm: FormGroup;
  summed: number;
  loading = false;
  error = false;

  constructor(
    private fb: FormBuilder,
    private ds: DataService
  ) { }
  
  ngOnInit() {
    this.loading = true;
    // get all employees for list
    this.ds.getAllEmployees().subscribe(
      employees => {
      this.allEmployees = employees;
      this.loading = false;
    },
    err => {
      // if couldnt get data, hide loader, show error
      this.loading = false;
      this.error = true;
    });

    // get all products for list
    this.ds.getAllProducts().subscribe(
      products => {
        this.allProducts = products;
        this.loading = false;
      },
      err => {
        // if couldnt get data, hide loader, show error
        this.loading = false;
        this.error = true;
      });
    // init form
    this.purchaseForm = this.fb.group({
      employeeId: ['', [Validators.required]],
      product: this.fb.array([], Validators.required),
    });

    // add the first product row to form
    this.addPurchaseFormRow();

    // calculate sum of purchase
    this.calculateSum();
  }

  // get products formArray
  get purchaseFromRows() {
    return this.purchaseForm.get('product') as FormArray;
  }

  // add product row
  addPurchaseFormRow() {
    const row = this.fb.group({
      productId: [[], [Validators.required]],
      amount: [[], [Validators.required, Validators.max(10)]],
    });
    this.purchaseFromRows.push(row);
  }

  // delete product row
  deletePurchaseFormRow(i) {
    if (this.purchaseFromRows.length <= 1) {
      Swal.fire({
        titleText: 'Legalább egy termék felvitele kötelező!',
        text: 'Nem lehet kitörölni az összes terméket.',
        icon: 'error',
        confirmButtonColor: '#3F51B5'
      });
    } else {
      Swal.fire({
        titleText: 'Biztos benne?',
        text: 'A termék törlését nem lehet visszavonni.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3F51B5',
        cancelButtonColor: '#F44336',
        confirmButtonText: 'Igen',
        cancelButtonText: 'Nem',
        focusConfirm: false,
      }).then((result) => {
        if (result.value) {
          Swal.fire({
            titleText: 'Törölve!',
            text: 'A termék törölve.',
            icon: 'success',
            confirmButtonColor: '#3F51B5',
          });
          this.purchaseFromRows.removeAt(i);
        }});
    }
  }

  // reset form
  resetForm(): void {
    this.purchaseForm.reset();
    this.purchaseFromRows.clear();
    this.addPurchaseFormRow();
  }

  // clear form
  clearPurchase(formDirective: FormGroupDirective): void {
    Swal.fire({
      titleText: 'Biztos benne?',
      text: 'A vásárlás törlését nem lehet visszavonni.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3F51B5',
      cancelButtonColor: '#F44336',
      confirmButtonText: 'Igen',
      cancelButtonText: 'Nem',
      focusConfirm: false,
    }).then((result) => {
      if (result.value) {
        Swal.fire({
          titleText: 'Törölve!',
          text: 'A vásárlás törölve.',
          icon: 'success',
          confirmButtonColor: '#3F51B5',
        });
        formDirective.resetForm();
        this.resetForm();
      }});
  }

  // calculate price of product
  getProductPrice(num: string): number {
    if (typeof(num) !== 'string') {
      return 0;
    } else {
      const id: number = parseInt(num);
      let price: number;
      this.allProducts.forEach(product => {
        if (product.id === id) {
          price = product.price;
        }
      });
      return price;
    }
  }

  // calculate sum of purchase
  calculateSum(): void {
    this.purchaseFromRows.valueChanges.subscribe(r => {
      this.summed = 0;
      r.forEach(product => {
        this.summed += this.getProductPrice(product.productId) * product.amount;
      });
    });
  }

  // submitting form actions
  onSubmit(value: any, formDirective: FormGroupDirective): void {
    if (this.purchaseForm.invalid) {
      Swal.fire({
        titleText: 'Hiba!',
        text: 'A mezők helytelenül vannak kitöltve.',
        icon: 'error',
        confirmButtonColor: '#3F51B5',
      });
    } else {
      Swal.fire({
        titleText: 'Biztos benne?',
        text: 'A vásárlást ez után nem lehet visszavonni.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3F51B5',
        cancelButtonColor: '#F44336',
        confirmButtonText: 'Igen',
        cancelButtonText: 'Nem',
        focusConfirm: false,
      }).then((result) => {
        if (result.value) {
          const employeeId: number = parseInt(value.employeeId);
          // create purchase
          this.ds.createPurchase(employeeId).subscribe(
            purchaseId => {
              // create purchaseHasProduct for each row in form
              value.product.forEach(product => {
                const productId = parseInt(product.productId);
                const amount = product.amount;
                const purchasePriceTotal = (this.getProductPrice(product.productId)) * amount;
                this.ds.createPurchaseHasProduct(productId, amount, purchasePriceTotal, purchaseId)
                .subscribe();
              });
              formDirective.resetForm();
              this.resetForm();
              Swal.fire({
                titleText: 'Kész!',
                text: 'A vásárlás elmentve.',
                icon: 'success',
                confirmButtonColor: '#3F51B5',
              });
            },
            err => {
              Swal.fire({
                titleText: 'Hiba!',
                text: 'A vásárlás nem került mentésre.',
                icon: 'error',
                confirmButtonColor: '#3F51B5',
              });
            });
      }});
    }
  }
}
