import {ComponentFixture, TestBed} from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';


import { PageNotFoundComponent } from './page-not-found.component';

describe('PageNotFound', () => {

    let comp:    PageNotFoundComponent;
    let fixture: ComponentFixture<PageNotFoundComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;


    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [ PageNotFoundComponent ] // declare the test component
        });

        fixture = TestBed.createComponent(PageNotFoundComponent);

        comp = fixture.componentInstance;

        de = fixture.debugElement.query(By.css('.page-not-found-component'));
        el = de.nativeElement;
    });

    it('should display "Page not found"', () => {
        fixture.detectChanges();
        expect(el.textContent).toContain('Page not found');
    });
});