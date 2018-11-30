import { Component } from '@angular/core';

import {LinkedIn, LinkedInLoginScopes} from '@ionic-native/linkedin/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scopes: LinkedInLoginScopes[] = ['r_basicprofile', 'r_emailaddress', 'rw_company_admin', 'w_share'];

  constructor(private linkedin: LinkedIn) {}

  login() {
      this.linkedin.login(this.scopes, true)
          .then(() => console.log('Logged in!'))
          .catch(e => console.log('Error logging in', e));
  }

}
