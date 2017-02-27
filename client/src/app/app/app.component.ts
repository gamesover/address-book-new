import {Component} from '@angular/core';
import {ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: './app.component.html',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./app.component.scss', '../../../public/css/styles.scss']
})
export class AppComponent {
}
