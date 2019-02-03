import {Injectable} from '@angular/core';
import {AlertController} from '@ionic/angular';

/**
 * Service to display alert messages to the user.
 */
@Injectable({
    providedIn: 'root'
})
export class AlertService {

    /**
     * @ignore
     */
    constructor(private alertController: AlertController) {}

    /**
     * Presents a popup message to the screen with the given title,
     * subtitle, and message, and an OK button to dismiss the popup.
     *
     * @param {string} title The title of the popup message
     * @param {string} subtitle The subtitle of the popup message
     * @param {string} message The message to display
     * @returns A promise that evaluates after displaying the popup message
     */
    public async presentOkAlert(title: string,
                                subtitle: string,
                                message: string): Promise<void> {
        const alert = await this.alertController.create({
            header: title,
            subHeader: subtitle,
            message: message,
            buttons: ['OK']
        });
        await alert.present();
    }

    /**
     * Presents a popup message to the screen with the given title,
     * subtitle, and message, and the given buttons.
     *
     * @param {string} title The title of the popup message
     * @param {string} subtitle The subtitle of the popup message
     * @param {string} message The message to display
     * @param buttons The buttons to display in the popup
     * @returns A promise that evaluates after displaying the popup message
     */
    public async presentAlertWithButtons(title: string,
                                         subtitle: string,
                                         message: string,
                                         buttons: any[]): Promise<void> {
        const alert = await this.alertController.create({
            header: title,
            subHeader: subtitle,
            message: message,
            buttons: buttons
        });
        await alert.present();
    }

    /**
     * Presents a popup message to the screen with the given title,
     * subtitle, and message, the provided prompts, and the given buttons.
     *
     * @param {string} title The title of the popup message
     * @param {string} subtitle The subtitle of the popup message
     * @param {string} message The message to display
     * @param prompts The prompt input fields to display
     * @param buttons The buttons to display in the popup
     * @returns A promise that evaluates after displaying the popup message
     */
    public async presentAlertWithPrompts(title: string,
                                        subtitle: string,
                                        message: string,
                                        prompts: any[],
                                        buttons: any[]): Promise<void> {
        const alert = await this.alertController.create({
            header: title,
            subHeader: subtitle,
            message: message,
            buttons: buttons,
            inputs: prompts
        });
        await alert.present();
    }

}
