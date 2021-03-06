import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject, Observable} from 'rxjs';

import {AuthService} from '@app/core/auth';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    // Attribute names for the different settings
    private SEND_RECEIVE_SETTING = 'sendReceive';

    // Values representing the settings for the send/receive setting
    public readonly SR_SETTING_VAL = 'sr'; // SendReceive
    public readonly SO_SETTING_VAL = 'so'; // SendOnly
    public readonly RO_SETTING_VAL = 'ro'; // ReceiveOnly

    // Default setting values
    private DEFAULT_SEND_RECEIVE_SETTING = this.SR_SETTING_VAL;

    private _sendReceive: BehaviorSubject<string> = new BehaviorSubject(this.DEFAULT_SEND_RECEIVE_SETTING);
    public readonly sendReceive: Observable<string> = this._sendReceive.asObservable();

    constructor(private storage: Storage, private authService: AuthService) {
        this.authService.authState$.subscribe((state) => {
            if (state) {
                this.fetchSettingsData();
            }
        });
    }

    private async fetchSettingsData() {
        try {
            const srSetting = await this.storage.get(this.SEND_RECEIVE_SETTING);
            if (srSetting) {
                this._sendReceive.next(srSetting);
            } else {
                this.storage.set(this.SEND_RECEIVE_SETTING, this.DEFAULT_SEND_RECEIVE_SETTING);
            }
        } catch (e) {
            console.log('Unable to fetch settings', e);
        }
    }

    public async setSendReceiveSetting(sendReceive: string) {
        try {
            if (sendReceive === this.SR_SETTING_VAL
                || sendReceive === this.SO_SETTING_VAL
                || sendReceive === this.RO_SETTING_VAL) {
                await this.storage.set(this.SEND_RECEIVE_SETTING, sendReceive);
                this._sendReceive.next(sendReceive);
            }
        } catch (e) {
            console.log('Unable to update settings', e);
        }
    }

}
