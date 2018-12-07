import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss']
})
export class SettingsPage {

    constructor(private router: Router) {}

    saveSettings() {
        this.router.navigate(['home']);
    }

}
