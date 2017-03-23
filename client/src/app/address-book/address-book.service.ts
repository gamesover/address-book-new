import {Injectable}    from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {AddressBook} from './address-book';

@Injectable()
export class AddressBookService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private heroesUrl = 'api/address_books';  // URL to web api

    constructor(private http: Http) {
    }

    getAddressBooks(): Promise<AddressBook[]> {
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json() as AddressBook[])
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
