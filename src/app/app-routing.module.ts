import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', loadChildren: '@app/pages/login/login.module#LoginPageModule' },
    { path: 'home', loadChildren: '@app/pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
    { path: 'settings', loadChildren: '@app/pages/settings/settings.module#SettingsPageModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
