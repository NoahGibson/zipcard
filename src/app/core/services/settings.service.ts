import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private SEND_RECEIVE_SETTING = 'sendReceive';
    private RESUME_URI_SETTING = 'resumeUri';

    // Values representing the settings for the send/receive setting
    public readonly SR_SETTING_VAL = 'sr'; // SendReceive
    public readonly SO_SETTING_VAL = 'so'; // SendOnly
    public readonly RO_SETTING_VAL = 'ro'; // ReceiveOnly

    private _sendReceive: BehaviorSubject<string> = new BehaviorSubject(this.SR_SETTING_VAL);
    public readonly sendReceive: Observable<string> = this._sendReceive.asObservable();

    private _resume_uri: BehaviorSubject<string> = new BehaviorSubject('');
    public readonly resume_uri: Observable<string> = this._resume_uri.asObservable();

    constructor(private storage: Storage) {
        this.fetchSettingsData();
    }

    private async fetchSettingsData() {
        try {
            const srSetting = await this.storage.get(this.SEND_RECEIVE_SETTING);
            if (srSetting) {
                this._sendReceive.next(srSetting);
            } else {
                this.storage.set(this.SEND_RECEIVE_SETTING, this.SR_SETTING_VAL);
            }
            const resUriSetting = await this.storage.get(this.RESUME_URI_SETTING);
            if (resUriSetting) {
                this._resume_uri.next(resUriSetting);
            } else {
                this.storage.set(this.RESUME_URI_SETTING, '');
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

    public async setResumeUriSetting(resumeUri: string) {
        try {
            await this.storage.set(this.RESUME_URI_SETTING, resumeUri);
            this._resume_uri.next(resumeUri);
        } catch (e) {
            console.log('Unable to update settings', e);
        }
    }

}
