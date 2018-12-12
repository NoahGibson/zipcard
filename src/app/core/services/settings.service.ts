import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private SEND_RECEIVE_SETTING = 'sendReceive';

    // Values representing the settings for the send/receive setting
    public readonly SR_SETTING_VAL = 'sr'; // SendReceive
    public readonly SO_SETTING_VAL = 'so'; // SendOnly
    public readonly RO_SETTING_VAL = 'ro'; // ReceiveOnly

    private _sendReceive: BehaviorSubject<string> = new BehaviorSubject(this.SR_SETTING_VAL);
    public readonly sendReceive: Observable<string> = this._sendReceive.asObservable();

    constructor(private storage: Storage) {
        this.fetchSettingsData();
    }

    private async fetchSettingsData() {
        try {
            const setting = await this.storage.get(this.SEND_RECEIVE_SETTING);
            if (setting) {
                this._sendReceive.next(setting);
            } else {
                this.storage.set(this.SEND_RECEIVE_SETTING, this.SR_SETTING_VAL);
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
