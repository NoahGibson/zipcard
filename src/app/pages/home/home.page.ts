import {Component} from '@angular/core';
import {Subscription} from 'rxjs';
import {PopoverController} from '@ionic/angular';

import {CurrentUserService, User} from '@app/core';
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

    async presentQRCode() {
        const popover = await this.popoverController.create({
            component: QRPopoverComponent,
            componentProps: {
                qrData: this._currentUser.uid
            }
        });
        await popover.present();
    }

}
