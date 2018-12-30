import {Injectable} from '@angular/core';
import {Platform} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {File} from '@ionic-native/file/ngx';
import {FileTransfer} from '@ionic-native/file-transfer/ngx';
import {FilePath} from '@ionic-native/file-path/ngx';
import {BehaviorSubject, Observable} from 'rxjs';

import {AuthService} from '@app/core/auth';

@Injectable({
    providedIn: 'root'
})
export class ResumeService {

    private RESUME_SETTING = 'resume';
    private DEFAULT_RESUME_SETTING = {
        remoteSrc: '',
        name: '',
        localSrc: '',
        data: null
    };

    private _resume: BehaviorSubject<any> = new BehaviorSubject(this.DEFAULT_RESUME_SETTING);
    public readonly resume: Observable<any> = this._resume.asObservable();

    constructor(private platform: Platform,
                private storage: Storage,
                private file: File,
                private fileTransfer: FileTransfer,
                private filePath: FilePath,
                private authService: AuthService) {
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

    private async downloadResume(remoteSrc: string): Promise<string> {
        try {
            let path = null;
            let downloadSrc = remoteSrc;
            if (this.platform.is('ios')) {
                path = this.file.documentsDirectory;
            } else {
                path = this.file.externalDataDirectory;
                downloadSrc = await this.filePath.resolveNativePath(remoteSrc);
            }
            const transfer = this.fileTransfer.create();
            const entry = await transfer.download(downloadSrc, path + 'resume.pdf');
            return entry.toURL();
        } catch (e) {
            console.log('Unable to download resume', e);
        }
    }

    public async setResume(remoteSrc: string, name: string, data: Uint8Array) {
        try {
            const newResume = {
                remoteSrc: remoteSrc,
                name: name,
                localSrc: await this.downloadResume(remoteSrc),
                data: data
            };
            await this.storage.set(this.RESUME_SETTING, newResume);
            this._resume.next(newResume);
        } catch (e) {
            console.log('Unable to update resume settings', e);
        }
    }

    public async resetResume() {
        try {
            await this.storage.set(this.RESUME_SETTING, this.DEFAULT_RESUME_SETTING);
            this._resume.next(this.DEFAULT_RESUME_SETTING);
        } catch (e) {
            console.log('Unable to update resume settings', e);
        }
    }

}
