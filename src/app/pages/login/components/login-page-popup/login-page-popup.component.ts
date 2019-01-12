import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-login-page-popup',
    templateUrl: './login-page-popup.component.html',
    styleUrls: ['./login-page-popup.component.scss']
})
export class LoginPagePopupComponent {
    @Input() title: string;
}
