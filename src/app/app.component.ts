import { Component } from '@angular/core';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { VariablesGlobales } from './variablesGlobales';
import { SplashScreen } from '@capacitor/splash-screen';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent{
  constructor(
    private router: Router,
    private param: VariablesGlobales,
    ) {
      this.initializeApp();
    }

    initializeApp(){
      SplashScreen.show({
        showDuration: 2000,
        autoHide: true
      });
    }
}
