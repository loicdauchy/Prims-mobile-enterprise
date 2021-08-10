import { Component } from '@angular/core';
import { VariablesGlobales } from '../variablesGlobales';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
      private param: VariablesGlobales,
  ) {}

}
