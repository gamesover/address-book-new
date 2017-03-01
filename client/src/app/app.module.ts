import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddressBookComponent } from './address-book/address-book.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxDatatableModule,
        HttpModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        AddressBookComponent
    ],
    bootstrap: [ AppComponent ]
})
export class AppModule { }
