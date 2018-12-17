import {Component} from '@angular/core';
import {Chooser} from '@ionic-native/chooser/ngx';

import {SettingsService} from '@app/core';

@Component({
    selector: 'app-resume-chooser',
    templateUrl: './resume-chooser.component.html',
    styleUrls: ['./resume-chooser.component.scss']
})
export class ResumeChooserComponent {

    constructor(private chooser: Chooser,
                public settingsService: SettingsService) {}

    async choose() {
        /*
            NOTE: currently bug with ionic native plugin, so have to use cordova plugin
            directly instead. See: https://github.com/ionic-team/ionic-native/issues/2768
         */
        const file = await (<any>window).chooser.getFile('application/pdf');
        this.settingsService.setResumeSetting(file.uri, file.name);
    }

    clear() {
        this.settingsService.resetResumeSetting();
    }

}
