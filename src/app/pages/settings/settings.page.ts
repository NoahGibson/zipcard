import {Component} from '@angular/core';
import {ToastController} from '@ionic/angular';

import {NavigationService, SettingsService} from '@app/core';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss']
})
export class SettingsPage {

    srSetting = '';

    constructor(public settingsService: SettingsService,
                private navService: NavigationService,
                private toastController: ToastController) {
        this.settingsService.sendReceive.subscribe((setting) => {
            this.srSetting = setting;
        });
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

    async saveSettings() {
        try {
            await this.settingsService.setSendReceiveSetting(this.srSetting);
            await this.presentToast('Settings saved.');
            this.navService.navigate('home');
        } catch (e) {
            this.presentToast('Failed to save settings.');
        }
    }

    cancel() {
        this.navService.navigate('home');
    }

}
