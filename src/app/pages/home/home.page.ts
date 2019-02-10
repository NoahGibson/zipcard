import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {PopoverController} from '@ionic/angular';
import {Brightness} from '@ionic-native/brightness/ngx';
import {BarcodeScanner} from '@ionic-native/barcode-scanner/ngx';

import {AlertService, CurrentUserService, User} from '@app/core';
import {QRPopoverComponent} from './components/qr-popover/qr-popover.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    /**
     * The currently authenticated user.
     * @ignore
     */
    private _currentUser: User;

    /**
     * The subscription to the currently authenticated user.
     * @ignore
     */
    private _currentUserSubscription: Subscription;

    /**
     * @ignore
     */
    constructor(public currentUserService: CurrentUserService,
                private alertService: AlertService,
                private popoverController: PopoverController,
                private brightness: Brightness,
                private scanner: BarcodeScanner) {
        this.initializeCurrentUser();
    }

    /**
     * Ionic lifecycle hook that executes before destroying the page, used here to
     * unsubscribe from the current user.
     * @ignore
     */
    private ionViewWillLeave(): void {
        if (this._currentUserSubscription) {
            this._currentUserSubscription.unsubscribe();
        }
    }

    /**
     * Subscribes to the current user.
     * @ignore
     */
    private initializeCurrentUser(): void {
        this._currentUserSubscription = this.currentUserService.currentUser$.subscribe((user) => {
            this._currentUser = user;
        });
    }

    /**
     * Presents a QR code to the user containing their uid for reference by another user to fetch
     * their details. Displays an alert message to the user if their resume is not set.
     *
     * @returns A promise that resolves after displaying the QR code to the user
     */
    private async presentQRCode(): Promise<void> {
        if (this._currentUser && this._currentUser.resumeUrl) {

            // Creating popover
            const popover = await this.popoverController.create({
                component: QRPopoverComponent,
                componentProps: {
                    qrData: this._currentUser.uid
                }
            });

            // Getting current brightness, and creating function to reset brightness
            const oldBrightness = await this.brightness.getBrightness();
            popover.onWillDismiss().then(async () => {
                await this.brightness.setBrightness(oldBrightness);
            });

            // Setting brightness to 100% and displaying qr code
            const popoverPresent = popover.present();
            const brightnessChange = this.brightness.setBrightness(1);
            await popoverPresent;
            await brightnessChange;

        } else {
            await this.alertService.presentOkAlert(
                'You don\'t have a resume set!',
                '',
                'Upload your resume on the Profile page to send it.'
            );
        }
    }

    /**
     * Presents a QR code scanner to the user, so they can scan the code of another
     * user in order to fetch their details.
     *
     * @returns A promise that resolves after displaying and scanning a QR code
     */
    private async presentQRScanner(): Promise<void> {
        try {
            const data = await this.scanner.scan({
                formats: 'QR_CODE',
                prompt: 'Scan a user\'s QR code to view their resume!',
                resultDisplayDuration: 0
            });
            if (!data.cancelled) {
                console.log(data.text);
            }
        } catch (e) {
            await this.alertService.presentOkAlert(
                'Oops!',
                '',
                'Something didn\'t work properly. Make sure you allow access to your camera and maybe try again?'
            );
        }
    }

}
