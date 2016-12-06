import { Component, OnInit } from '@angular/core';
import { Hero } from '../Hero';
@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit {
  powers = ['Really smart', 'Super Flexible', 'Super Hot', 'Weather change'];
  model = new Hero(18, '124214fasfasf', this.powers[0], 'Chuck overstreet');
  submitted = false;
  onSubmit() { this.submitted = true; }
  get diagnostic() { return JSON.stringify(this.model) }
  newHero(){
    this.model =new Hero(41,'','','');
  }
  constructor() { }

  ngOnInit() {
  }

}
