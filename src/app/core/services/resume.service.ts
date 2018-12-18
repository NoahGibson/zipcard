import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {BehaviorSubject, Observable} from 'rxjs';

import {AuthService} from '@app/core/auth';

@Injectable({
    providedIn: 'root'
})
export class ResumeService {

    private RESUME_SETTING = 'resume';
    private DEFAULT_RESUME_SETTING = { uri: '', name: '', src: '' };

    private _resume: BehaviorSubject<any> = new BehaviorSubject(this.DEFAULT_RESUME_SETTING);
    public readonly resume: Observable<any> = this._resume.asObservable();

    constructor(private storage: Storage, private authService: AuthService) {
        this.authService.authState.subscribe((state) => {
            if (state) {
                this.fetchResumeData();
            }
        });
    }

    private async fetchResumeData() {
        try {
            const resumeSetting = await this.storage.get(this.RESUME_SETTING);
            if (resumeSetting) {
                this._resume.next(resumeSetting);
            } else {
                this.storage.set(this.RESUME_SETTING, this.DEFAULT_RESUME_SETTING);
            }
        } catch (e) {
            console.log('Unable to fetch resume data', e);
        }
    }

    public async setResumeSetting(uri: string, name: string) {
        try {
            const newResume = { uri: uri, name: name };
            await this.storage.set(this.RESUME_SETTING, newResume);
            this._resume.next(newResume);
        } catch (e) {
            console.log('Unable to update settings', e);
        }
    }

    public async resetResumeSetting() {
        try {
            await this.storage.set(this.RESUME_SETTING, this.DEFAULT_RESUME_SETTING);
            this._resume.next(this.DEFAULT_RESUME_SETTING);
        } catch (e) {
            console.log('Unable to update settings', e);
        }
    }

}
