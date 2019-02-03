import {Injectable} from '@angular/core';
import {LoadingController} from '@ionic/angular';

/**
 * Service to display and dismiss a loading overlay.
 */
@Injectable({
    providedIn: 'root'
})
export class LoadingService {

    /**
     * The loading overlay.
     * @ignore
     */
    private loading;

    /**
     * @ignore
     */
    constructor(private loadingController: LoadingController) {}

    /**
     * Displays a loading message to the screen. The loading overlay
     * will not be dismissed until calling LoadingService.dismissLoading().
     *
     * @param {string} message The message to display while loading
     * @returns A promise that evaluates after displaying the loading overlay
     */
    public async displayLoading(message: string): Promise<void> {
        this.loading = await this.loadingController.create({
            message: message,
            spinner: 'circles'
        });
        this.loading.present();
    }

    /**
     * Dismisses the currently displayed loading overlay, if one exists.
     *
     * @returns A promise that evaluates after dismissing the loading overlay
     */
    public async dismissLoading(): Promise<void> {
        if (this.loading) {
            await this.loading.dismiss();
            this.loading = null;
        }
    }

}
