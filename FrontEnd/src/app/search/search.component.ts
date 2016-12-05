import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  query: string;
  results: Object;
  constructor(private spotify: SpotifyService,
    private router: Router,
    private route: ActivatedRoute) {
    this.route
      .queryParams
      .subscribe(params => { this.query = params['query'] || ''; })
  }

  ngOnInit() {
    this.search();
  }
  search(): void {
   
    if (!this.query) {
      return;
    }
    this.spotify
      .searchTrack(this.query)
      .subscribe((res: any) => this.renderResults(res));
       console.log('this.query', JSON.stringify(this.query));
  }
  renderResults(res: any): void {
    this.results = null;
    if (res && res.tracks && res.tracks.items) {
      this.results = res.tracks.items; console.log(this.results);
    }
    console.log(this.results);
  }
  submit(query: string): void {
    this.router.navigate(['search'], { queryParams: { query: query } })
      .then(_ => this.search());
  }

}
