import {Component} from '@angular/core';
import {Chooser} from '@ionic-native/chooser/ngx';

import {ResumeService} from '@app/core';

@Component({
    selector: 'app-resume-chooser',
    templateUrl: './resume-chooser.component.html',
    styleUrls: ['./resume-chooser.component.scss']
})
export class ResumeChooserComponent {

    constructor(private chooser: Chooser,
                public resumeService: ResumeService) {}

    async choose() {
        /*
            NOTE: currently bug with ionic native plugin, so have to use cordova plugin
            directly instead. See: https://github.com/ionic-team/ionic-native/issues/2768
         */
        const file = await (<any>window).chooser.getFile('application/pdf');
        // if (file) {
        //     this.resumeService.setResume(file.uri, file.name, file.data);
        // }
    }

    clear() {
        // this.resumeService.resetResume();
    }

}
