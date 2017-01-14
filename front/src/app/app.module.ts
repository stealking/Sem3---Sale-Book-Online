import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { LocationStrategy, PathLocationStrategy, APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { AdminComponent, AdminComponentModule, routes as adminChildRoutes } from './components/admin/admin.component';
import { HomeComponent, HomeComponentModule, routes as homeChildRoutes } from './components/home/home.component';




const routes: Routes = [
  { path: '', component: HomeComponent, children: homeChildRoutes },
  { path: 'admin', component: AdminComponent, children: adminChildRoutes }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AdminComponentModule,
    HomeComponentModule,
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
