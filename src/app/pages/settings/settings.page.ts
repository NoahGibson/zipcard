import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '@app/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss']
})
export class SettingsPage {

    private srSetting = '';

    constructor(private userService: UserService, private router: Router) {
        this.srSetting = this.userService.getUserSr();
    }

    saveSettings() {
        this.userService.setUserSr(this.srSetting);
        this.router.navigate(['home']);
    }

}
