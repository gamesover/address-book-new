import {NgModule}             from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AddressBooksComponent} from './address-books/address-books.component';
import {FileUploadComponent} from './file-upload/file-upload.component';

const routes: Routes = [
    {path: 'address-books', component: AddressBooksComponent},
    {path: 'address-books/file-upload', component: FileUploadComponent},
    {path: '', redirectTo: '/address-books', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
