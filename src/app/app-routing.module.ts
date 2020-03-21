import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeRiportComponent } from './components/employee-riport/employee-riport.component';
import { ProductRiportComponent } from './components/product-riport/product-riport.component';
import { PurchaseFormComponent } from './components/purchase-form/purchase-form.component';


const routes: Routes = [
  {path: 'employeeriport', component: EmployeeRiportComponent},
  {path: 'productriport', component: ProductRiportComponent},
  {path: 'purchase', component: PurchaseFormComponent},
  {path: '', component: PurchaseFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
