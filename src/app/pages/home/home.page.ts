import {Component} from '@angular/core';

import {AuthService, ResumeService} from '@app/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

    constructor(public resumeService: ResumeService,
                public authService: AuthService) {}

}
