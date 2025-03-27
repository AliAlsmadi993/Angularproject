import { Component } from '@angular/core';
import { AdnanService } from '../service/adnan.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

  constructor(private _url: AdnanService) { }

  container: any;
  ngOnInit() {
    this._url.userObservable.subscribe((data) => {
      this.container = data;
    })
  }

  getData() {

  }

}
