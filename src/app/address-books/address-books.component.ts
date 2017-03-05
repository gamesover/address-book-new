import {Component, OnInit} from '@angular/core';

// todo: it seems import font unsuccessfully
import '../../../node_modules/@swimlane/ngx-datatable/release/index.css';
import '../../../node_modules/@swimlane/ngx-datatable/release/themes/material.css';
import '../../../node_modules/@swimlane/ngx-datatable/release/assets/icons.css';

import {AddressBookService} from "../address-book/address-book.service";
import {AddressBook} from "../address-book/address-book";

@Component({
    selector: 'address-books',
    templateUrl: 'address-books.component.html',
    styleUrls: ['address-books.component.scss'],
    providers: [AddressBookService]
})

export class AddressBooksComponent implements OnInit {
    private rows: AddressBook[] = [];
    private count: number = 0;
    private offset: number = 0;
    private limit: number = 10;

    constructor(private addressBookService: AddressBookService) {
    }

    ngOnInit() {
        this.page(this.offset, this.limit);
    }

    page(offset: number, limit: number) {
        this.getAddressBooks().then((addressBooks: AddressBook[]) => {

            this.count = addressBooks.length;

            const start = offset * limit;
            const end = start + limit;
            const rows = [...this.rows];

            for (let i = start; i < end; i++) {
                rows[i] = addressBooks[i];
            }

            this.rows = rows;
        });
    }

    getAddressBooks(): Promise<AddressBook[]> {
        return this.addressBookService
            .getAddressBooks();
    }

    onPage(event: any) {
        this.page(event.offset, event.limit);
    }
}

