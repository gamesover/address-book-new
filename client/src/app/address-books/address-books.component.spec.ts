import {ComponentFixture, TestBed, async, fakeAsync, tick} from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import { HttpModule } from '@angular/http';

import { AddressBooksComponent } from './address-books.component';
import {AddressBookService} from '../address-book/address-book.service';

describe('AddressBooks', () => {

    let comp:    AddressBooksComponent;
    let fixture: ComponentFixture<AddressBooksComponent>;
    let spy: jasmine.Spy;
    let de:      DebugElement;
    let el:      HTMLElement;
    let addressBookService: AddressBookService; // the TestBed injected service

    const addressBooks = [{ email: 'test@test.com', name: 'Test User'}];

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ NgxDatatableModule, HttpModule ],
            providers:    [ AddressBookService ],
            declarations: [ AddressBooksComponent ] // declare the test component
        });

        fixture = TestBed.createComponent(AddressBooksComponent);

        comp = fixture.componentInstance; // BannerComponent test instance

        addressBookService = fixture.debugElement.injector.get(AddressBookService);

        spy = spyOn(addressBookService, 'getAddressBooks')
            .and.returnValue(Promise.resolve(addressBooks));

        de = fixture.debugElement.query(By.css('.address-books-component'));
        el = de.nativeElement;
    });

    it('should only show address books before OnInit', () => {
        expect(el.textContent.trim()).toBe('Address Books');
    });

    it('should cannot call getAddressBooks before OnInit', () => {
        expect(spy.calls.any()).toBe(false, 'getAddressBooks not yet called');
    });

    it('should still not show AddressBooks after component initialized', () => {
        fixture.detectChanges();

        expect(el.textContent).toContain('No data to display', 'no address books yet');
        expect(spy.calls.any()).toBe(true, 'getQuote called');
    });
    it('should show address books after getAddressBooks promise (async)', async(() => {
        fixture.detectChanges();
        fixture.whenStable().then(() => { // wait for async getQuote
            fixture.detectChanges();        // update view with quote
            expect(el.textContent).toContain(addressBooks[0].email);
        });
    }));
    it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
        fixture.detectChanges();
        tick();                  // wait for async getQuote
        fixture.detectChanges(); // update view with quote
        expect(el.textContent).toContain(addressBooks[0].email);
    }));
});