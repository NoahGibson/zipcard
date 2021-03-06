import {Component} from '@angular/core';
import {Chooser} from '@ionic-native/chooser/ngx';

@Component({
    selector: 'app-resume-chooser',
    templateUrl: './resume-chooser.component.html',
    styleUrls: ['./resume-chooser.component.scss']
})
export class ResumeChooserComponent {

    constructor(private chooser: Chooser) {}

    async choose() {
        const file = await this.chooser.getFile('application/pdf');
        // if (file) {
        //     this.resumeService.setResume(file.uri, file.name, file.data);
        // }
    }

    clear() {
        // this.resumeService.resetResume();
    }

}
