import { Component, OnInit } from '@angular/core';
import {SpotifyService} from '../services/spotify.service'
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.component.html',
  styleUrls: ['./tracks.component.css']
})
export class TracksComponent implements OnInit {
  id: string;
  track: Object;
  constructor(public spotify: SpotifyService, public route: ActivatedRoute,
  public location: Location) { 
    // get id from param url
    route.params.subscribe(params=>{this.id = params['id'];});
  }

  ngOnInit() {
    this.spotify
    .getTrack(this.id)
    .subscribe((res: any) => this.renderTrack(res));
  }
  renderTrack(res: any){
    this.track = res;
  }
  back(): void{
    this.location.back();
  }
}
