import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';

// * LOADING
import { LoadingComponent } from './components/commons/loading/loading.component';
import { DashboardComponent } from './components/manager/dashboard/dashboard.component';
import { AccountModule } from './components/account/account.module';

@NgModule({
  declarations: [
    AppComponent,    
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    DashboardComponent,
    
  ],
  imports: [
    BrowserModule,    
    FormsModule,
    HttpClientModule,    
    AccountModule,
    AppRoutingModule
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
