import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Chooser} from '@ionic-native/chooser/ngx';

@Component({
    selector: 'app-resume-chooser',
    templateUrl: './resume-chooser.component.html',
    styleUrls: ['./resume-chooser.component.scss']
})
export class ResumeChooserComponent {
    @Input() resume = '';
    @Output() chosen = new EventEmitter();

    constructor(private chooser: Chooser) {}

    async choose() {
        /*
            NOTE: currently bug with ionic native plugin, so have to use cordova plugin
            directly instead. See: https://github.com/ionic-team/ionic-native/issues/2768
         */
        const file = await (<any>window).chooser.getFile('application/pdf');
        this.resume = file.name;
        this.chosen.emit(file);
    }
}
