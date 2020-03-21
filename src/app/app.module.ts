import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { EmployeeRiportComponent } from './components/employee-riport/employee-riport.component';
import { ProductRiportComponent } from './components/product-riport/product-riport.component';
import { PurchaseFormComponent } from './components/purchase-form/purchase-form.component';

import { MaterialModule } from './material/material.module';
import { MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    EmployeeRiportComponent,
    ProductRiportComponent,
    PurchaseFormComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [
    {
      provide: MAT_PROGRESS_SPINNER_DEFAULT_OPTIONS,
      useValue: {
        _forceAnimations: true
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
