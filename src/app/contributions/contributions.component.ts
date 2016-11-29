import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'xp-contributions',
  template: `
    <h1>Greetings, friend</h1>
    <p>Here you could fill out some interesting information about yourself and earn some experience points while you're at it!</p>
    <p>Each column below represents something that we value highly. Feel free to fill them in and gain some points after the admin validates. :)</p>
    <xp-contributions-form></xp-contributions-form>
  `,
  styles: []
})
export class ContributionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
