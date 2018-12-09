import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {ToastController} from '@ionic/angular';

import {UserService} from '@app/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss']
})
export class SettingsPage {

    private srSetting = '';

    constructor(private userService: UserService, private router: Router, private toastController: ToastController) {
        this.srSetting = this.userService.getUserSr();
    }

    private async presentToast(msg) {
        const toast = await this.toastController.create({
            message: msg,
            duration: 3000,
            showCloseButton: true,
            closeButtonText: 'Ok',
            position: 'top',
            translucent: true
        });
        toast.present();
    }

    saveSettings() {
        this.userService.setUserSr(this.srSetting)
            .then((success) => {
                if (success) {
                    this.presentToast('Settings saved.')
                        .then(() => {
                            this.router.navigate(['home']);
                        }
                    );
                } else {
                    this.presentToast('Failed to save settings.');
                }
            });
    }

    cancel() {
        this.router.navigate(['home']);
    }

}
