import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'oauth',
    loadChildren: () =>
      import('./modules/oauth/oauth.module').then(m => m.OauthModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./modules/booking/booking.module').then(m => m.BookingModule),
       canActivate: [AuthGuard]
  },
  {
    path: 'task',
    loadChildren: () =>
      import('./modules/task/task.module').then(m => m.TaskModule),
       canActivate: [AuthGuard]
  },
  {
    path: 'accommodation',
    loadChildren: () =>
      import('./modules/accommodation/accommodation.module').then(m => m.AccommodationModule),
       canActivate: [AuthGuard]
  },
  {
    path: 'settlement',
    loadChildren: () =>
      import('./modules/settlement/settlement.module').then(m => m.SettlementModule),
       canActivate: [AuthGuard]
  },
  {
    path: 'documents',
    loadChildren: () =>
      import('./modules/documents/documents.module').then(m => m.DocumentsModule),
       canActivate: [AuthGuard]
  },
  {
    path: 'started',
    loadChildren: () =>
      import('./modules/started/started.module').then(m => m.StartedModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    enableTracing: false,
    useHash: false,
    scrollPositionRestoration: 'enabled',

  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
