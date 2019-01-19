import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';

import {AuthService, User, UserService} from '@app/core';

/**
 * A user's profile page, where they can edit their information.
 */
@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss']
})
export class ProfilePage {

    updateNameForm: FormGroup;
    updateNameError: string;

    private _currentUser: User;
    private _currentUserSubscription: Subscription;

    constructor(public authService: AuthService,
                private fb: FormBuilder) {
        this._currentUserSubscription = this.authService.currentUser$.subscribe((user) => {
            this._currentUser = user;
        });

        this.updateNameForm = fb.group({
            firstName: [this._currentUser.firstName, Validators.compose([Validators.required])],
            lastName: [this._currentUser.lastName, Validators.compose([Validators.required])]
        });

    }

    private ionViewWillLeave() {
        this._currentUserSubscription.unsubscribe();
    }


    public updateName(): void {
        const data = this.updateNameForm.value;
        if (!data.firstName || !data.lastName) {
            return;
        }
        this.authService.updateName(data.firstName, data.lastName);
    }
}
