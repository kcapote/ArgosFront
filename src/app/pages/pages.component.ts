import { Component, OnInit } from '@angular/core';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styles: []
})
export class PagesComponent implements OnInit {

  constructor(private _ps: ProviderService) { }

  ngOnInit() {
  }

}
