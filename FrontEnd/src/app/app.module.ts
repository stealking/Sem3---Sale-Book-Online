import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from "@angular/common";
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ArtistsComponent } from './artists/artists.component';
import { AlbumsComponent } from './albums/albums.component';
import { TracksComponent } from './tracks/tracks.component';
import { SPOTIFY_PROVIDER } from './services/spotify.service';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProtectedComponent } from './protected/protected.component';

// prime ng
import {InputTextModule} from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

// guard
import{LoggedInGuard} from './guards/loggedIn.guard';
import {AUTH_PROVIDERS} from './services/auth.service';
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'home', component: HomeComponent },
  { path: 'tracks/:id', component: TracksComponent },
  { path: 'protected', component: ProtectedComponent, canActivate: [LoggedInGuard] },
];
@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    ArtistsComponent,
    AlbumsComponent,
    TracksComponent,
    HomeComponent,
    LoginComponent,
    ProtectedComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    InputTextModule,
    ButtonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    SPOTIFY_PROVIDER,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' },
    LoggedInGuard,
    AUTH_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
