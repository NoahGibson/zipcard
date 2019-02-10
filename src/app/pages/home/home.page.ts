import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {PopoverController} from '@ionic/angular';

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
                private popoverController: PopoverController) {
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
     * Present a QR code to the user containing their uid for reference by another user to fetch
     * their details. Displays an alert message to the user if their resume is not set.
     * @ignore
     */
    async presentQRCode() {
        if (this._currentUser && this._currentUser.resumeUrl) {
            const popover = await this.popoverController.create({
                component: QRPopoverComponent,
                componentProps: {
                    qrData: this._currentUser.uid
                }
            });
            await popover.present();
        } else {
            await this.alertService.presentOkAlert(
                'You don\'t have a resume set!',
                '',
                'Upload your resume on the Profile page to send it.'
            );
        }
    }

}
