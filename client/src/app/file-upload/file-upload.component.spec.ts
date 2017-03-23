import {ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { HttpModule } from '@angular/http';

import { FileUploadComponent } from './file-upload.component';

describe('FileUpload', () => {

    let comp:    FileUploadComponent;
    let fixture: ComponentFixture<FileUploadComponent>;
    let de:      DebugElement;
    let el:      HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FileUploadModule, HttpModule ],
            providers:    [ FileUploadComponent ],
            declarations: [ FileUploadComponent ] // declare the test component
        });

        fixture = TestBed.createComponent(FileUploadComponent);

        comp = fixture.componentInstance; // BannerComponent test instance

        de = fixture.debugElement.query(By.css('.file-upload-component'));
        el = de.nativeElement;
    });

    it('should be fine', inject([FileUploadComponent], (fixture:ComponentFixture<FileUploadComponent>) => {
        expect(fixture).not.toBeNull();
    }));
});