import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'address-book',
    templateUrl: 'address-book.component.html',
    styleUrls: [ 'address-book.component.scss' ]
})

export class AddressBookComponent implements OnInit {
    private rows: any[] = [];
    private count: number = 0;
    private offset: number = 0;
    private limit: number = 10;

    ngOnInit() {
        this.page(this.offset, this.limit);
    }

    page(offset: any, limit: any) {
        this.fetch((results: any) => {
            this.count = results.length;

            const start = offset * limit;
            const end = start + limit;
            const rows = [...this.rows];

            for (let i = start; i < end; i++) {
                rows[i] = results[i];
            }

            this.rows = rows;
        });
    }

    fetch(cb: any) {
        const req = new XMLHttpRequest();
        req.open('GET', `api/address_books`);

        req.onload = () => {
            cb(JSON.parse(req.response));
        };

        req.send();
    }

    onPage(event: any) {
        this.page(event.offset, event.limit);
    }
}

