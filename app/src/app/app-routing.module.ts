import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'sign-up',
    loadChildren: () => import('./sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'sign-in',
    loadChildren: () => import('./sign-in/sign-in.module').then( m => m.SignInPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterModule)
  },
  {
    path: 'verify-phone',
    loadChildren: () => import('./verify-phone/verify-phone.module').then( m => m.VerifyPhoneModule)
  },
  {
    path: 'list-studio',
    loadChildren: () => import('./list-studio/list-studio.module').then( m => m.ListStudioModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule)
  },
  {
    path: 'my-booking',
    loadChildren: () => import('./my-booking/my-booking.module').then( m => m.MyBookingModule)
  },
  {
    path: 'book-game',
    loadChildren: () => import('./book-game/book-game.module').then( m => m.BookGameModule)
  },
  {
    path: 'drop-in-pass',
    loadChildren: () => import('./drop-in-pass/drop-in-pass.module').then( m => m.DropInPassModule)
  },
  {
    path: 'verify-otp',
    loadChildren: () => import('./verify-otp/verify-otp.module').then( m => m.VerifyOtpModule)
  },
  {
    path: 'explore',
    loadChildren: () => import('./explore/explore.module').then( m => m.ExploreModule)
  },
  {
    path: 'account-info',
    loadChildren: () => import('./account-info/account-info.module').then( m => m.AccountInfoModule)
  },
  {
    path: 'on-boarding',
    loadChildren: () => import('./on-boarding/on-boarding.module').then( m => m.OnBoardingModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: 'sign-in',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
