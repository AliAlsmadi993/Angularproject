import { Component } from '@angular/core';
import { SaService } from '../sa.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {
  constructor(private _h: SaService, private _active: ActivatedRoute) { }

  ngOnInit() {
    this.showhistory(this.id);
  }
  stuff: any;
  id: any;
  showhistory(id: any) {
    this.id = this._active.snapshot.paramMap.get("id");
    this._h.gethistory(this.id).subscribe((data) => { this.stuff = data; })
  }
}

