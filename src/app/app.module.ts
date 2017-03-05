import {NgModule} from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {HttpModule} from '@angular/http';
import {FileUploadModule} from 'ng2-file-upload/ng2-file-upload';

import {AddressBookService}          from './address-book/address-book.service';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AddressBooksComponent} from './address-books/address-books.component';
import {FileUploadComponent} from './file-upload/file-upload.component';

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxDatatableModule,
        HttpModule,
        FileUploadModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        AddressBooksComponent,
        FileUploadComponent
    ],
    providers: [AddressBookService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
