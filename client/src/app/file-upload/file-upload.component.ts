import {Component, OnInit} from '@angular/core';
import {FileUploader, FileItem, ParsedResponseHeaders} from 'ng2-file-upload';

const URL = 'api/address_books/upload';
const ALLOWED_MIME_TYPE = ['text/csv', 'application/vnd.ms-excel'];

@Component({
    selector: 'file-upload',
    templateUrl: 'file-upload.component.html',
    styleUrls: ['file-upload.component.scss']
})

export class FileUploadComponent implements OnInit {
    public uploader: FileUploader;
    public hasBaseDropZoneOver: boolean = false;
    public msgs: string[] = [];
    public warnings: string[] = [];
    public errors: string[] = [];
    public conflicts: IConflict[] = [];

    private corrections = {};

    ngOnInit() {
        this.initFileUploader();
    }

    private initFileUploader() {
        this.uploader = new FileUploader({
            url: URL,
            allowedMimeType: ALLOWED_MIME_TYPE,
            queueLimit: 1
        });
        this.uploader.onSuccessItem = this.uploaderOnSuccessItem.bind(this);
        this.uploader.onErrorItem = this.uploaderOnErrorItem.bind(this);
        this.uploader.onCompleteAll = this.uploaderOnCompleteAll.bind(this);
        this.uploader.onAfterAddingAll = this.uploaderOnAfterAddingAll.bind(this);
    }

    private uploaderOnSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
        this.msgs = [`Upload ${item.file.name} Successful`];

        const created_num_and_updated_num = JSON.parse(response);

        const created_msg = `Created new record ${created_num_and_updated_num.created_num} lines`;
        const updated_msg = `Updated record ${created_num_and_updated_num.updated_num} lines`;

        this.msgs.push(...[created_msg, updated_msg]);
        this.uploader.clearQueue();
    }

    private uploaderOnErrorItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) {
        if (status === 422) {
            const errors_and_conflicts = JSON.parse(response);

            this.errors = errors_and_conflicts.errors;
            this.conflicts = errors_and_conflicts.conflicts;

            if (this.conflicts.length > 0)
                this.warnings.push('Conflicted Records found, please move to the bottom table to correct');
        }
    }

    private uploaderOnCompleteAll() {
        this.clearProgressBar();
    }

    private uploaderOnAfterAddingAll(fileItems: FileItem[]) {
        this.clearHintsAndCorrections();
    }

    private clearProgressBar() {
        setTimeout(() => {
            this.uploader.progress = 0;
        }, 1000);
    }

    private checkConflictsUnsolved() {
        const diff = this.conflicts.length - Object.keys(this.corrections).length;

        if (diff > 0) {
            this.errors = [`You have ${diff} emails' name unselected`];
        }

        return this.errors.length > 0;
    }

    public fileOverBase(mouseOver: boolean): void {
        this.hasBaseDropZoneOver = mouseOver;
    }

    public fileDrop(files: File[]) {
        this.uploader.clearQueue();
        this.uploader.addToQueue(files);
    }

    public selectName(email: string, reserved: 'new' | 'old') {
        this.clearUserHints();
        this.corrections[email] = reserved;
    }

    public sendFile(file: FileItem) {
        this.clearUserHints();

        if (this.checkConflictsUnsolved()) {
            return;
        }

        this.addCorrectionsToFileUploader();
        this.clearCorrections();

        file.upload();
    }

    public removeFile(file: FileItem) {
        this.clearHintsAndCorrections();

        file.remove();
    }

    private addCorrectionsToFileUploader() {
        let options = this.uploader.options;
        options.additionalParameter = {
            correction: JSON.stringify(this.corrections)
        };
        this.uploader.setOptions(options);
    }

    private clearUserHints() {
        this.msgs = [];
        this.warnings = [];
        this.errors = [];
    }

    private clearCorrections() {
        this.conflicts = [];
        this.corrections = {};
    }

    private clearHintsAndCorrections() {
        this.clearUserHints();
        this.clearCorrections();
    }
}

interface IConflict {
    email: string;
    new_name: string;
    old_name: string;
}