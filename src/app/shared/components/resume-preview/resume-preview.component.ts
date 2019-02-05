import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

/**
 * Component to display a preview of a user's resume.
 */
@Component({
    selector: 'app-resume-preview',
    templateUrl: './resume-preview.component.html',
    styleUrls: ['./resume-preview.component.scss']
})
export class ResumePreviewComponent implements OnChanges {

    /**
     * The resume url for the user; that is, the url to the resume file
     * in Firebase storage.
     */
    @Input() resumeUrl: string;

    /**
     * The resume to preview.
     * @ignore
     */
    _resume: any;

    /**
     * The subscription to the resume to preview.
     * @ignore
     */
    private _resumeSubscription: Subscription;

    /**
     * @ignore
     */
    constructor(private http: HttpClient) {}

    /**
     * Function triggered on changes to the the inputs to the component.
     * @ignore
     */
    ngOnChanges(changes: SimpleChanges): void {
        if (this.resumeUrl && (changes.resumeUrl.currentValue !== changes.resumeUrl.previousValue)) {
            this._resumeSubscription = this.http.get(this.resumeUrl, {responseType: 'blob'}).subscribe((resume) => {
                this._resume = URL.createObjectURL(resume);
            });
        } else if (!this.resumeUrl) {
            this._resume = null;
        }
    }

    /**
     * Function called when component is about to be destroyed.
     * @ignore
     */
    ionViewWillLeave() {
        if (this._resumeSubscription) {
            this._resumeSubscription.unsubscribe();
        }
    }

}
