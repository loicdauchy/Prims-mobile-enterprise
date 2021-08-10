import { Component, ChangeDetectorRef } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { VariablesGlobales } from '../variablesGlobales';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, NavigationCancel } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Flashlight } from '@ionic-native/flashlight/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {

  constructor(
              private http: HttpClient,
              private param: VariablesGlobales,
              private qrScanner: QRScanner,
              public router: Router,
              private vibration: Vibration,
              private flashlight: Flashlight,
              private changeRef: ChangeDetectorRef
             ) {
              this.router.events.subscribe((event: Event) => {
                if (event instanceof NavigationStart) {
                    // Show loading indicator
                    console.log({
                      type: "CONSOLE ROUTE",
                      name: "NAVIGATION START",
                      data: event.url
                    }) 
                }
          
                if (event instanceof NavigationEnd) {
                    // Hide loading indicator
                    console.log({
                      type: "CONSOLE ROUTE",
                      name: "NAVIGATION END",
                      data: event.url
                    })
                    if(this.param.isLoggedIn){

                      if(event.url !== "/tabs/tab1"){
                        this.closeCamera();  
                      }

                      if(event.url === "/tabs/tab1"){
                          this.scanner(); 
                      }

                    }
                }
          
                if (event instanceof NavigationCancel) {
                    // Hide loading indicator
                    console.log({
                      type: "CONSOLE ROUTE",
                      name: "NAVIGATION CANCEL",
                      data: event.url
                    })
                }
          
                if (event instanceof NavigationError) {
                    // Hide loading indicator
          
                    // Present error to user
                    console.log(event.error);
                }
            });
            
          
             }
  
  email:string ;
  password:string ;
  nom:string ;
  prenom:string ;
  loading:boolean = false;
  security:boolean = true;
  userId:string ;     
  userName:string ;
  showCamera:boolean = false;
  commerceSelected:boolean = false;
  enterView:boolean = false;
  memoriseId:boolean = false;

  connexion(){
    let url = "http://www.fidelite.webantek.com/loginApi";
    this.loading = true;
    this.http.post(url, {
      email: this.email,
      password: this.password
    }).toPromise().then((response:any) => {
      var dataUser = response.data;
      var user = {
        id: dataUser.id,
        prenom: dataUser.prenom
      };
      localStorage.setItem('user', JSON.stringify(user));
      if(this.memoriseId === true){
        localStorage.setItem('email', this.email);
        localStorage.setItem('password', this.password);
      }else{
        localStorage.removeItem('email');
        localStorage.removeItem('password');
      }
      this.setUser()
      this.loading = false;
      window.location.reload();
    })
  }

  register(){
    var url = "http://www.fidelite.webantek.com/inscription";
    window.open(url, '_system', 'location=yes'); return false;
  }

  selectedCommerce(id:number, nom:string){
    this.param.commerceId = id;
    localStorage.setItem('nomCommerceSelected', nom);
    localStorage.setItem('commerceSelected', id.toString());
    this.commerceSelected = true;
    this.scanner();
    document.getElementById('contentScann').classList.remove('whiteBackground');
  }

  setUser(){
    this.param.isLoggedIn = localStorage.getItem('user');
    if(this.param.isLoggedIn){
      this.userId = JSON.parse(localStorage.getItem('user')).id.toString();
      this.userName = JSON.parse(localStorage.getItem('user')).prenom;
    }
  }

  

  invokeVibration(durationInMs) {
    this.vibration.vibrate(durationInMs);
  }

  SwitchFlashLight(){
    this.flashlight.toggle();
  }

  topLine(){
    document.getElementById('line').classList.remove('bottomLine');
    this.changeRef.detectChanges();
  }

  bottomLine(){
    document.getElementById('line').classList.add('bottomLine');
    this.changeRef.detectChanges();
  }

  animateLine(){
    setInterval(()=>{

      this.bottomLine();

      setTimeout(()=>{
        this.topLine();
      },2000)

    },4000)

    this.enterView = true;
  }

  scanner(){
    this.qrScanner.prepare()
  .then((status: QRScannerStatus) => {
     if (status.authorized) {
       // camera permission was granted

       if(this.enterView === false){

        this.bottomLine();
        setTimeout(()=>{
          this.topLine();
        },2000)

        this.animateLine();

       }
       
       // start scanning
      //  this.qrScanner.resumePreview();

       this.qrScanner.show().then(data => {
         console.log({title: "CAMERA SHOW",data:data});
         this.showCamera = true;
        },err => console.log(err));

       let scanSub = this.qrScanner.scan().subscribe((text: string) => { 

         this.invokeVibration(1000);
         this.closeCamera();
         this.navigate(text);
       
         scanSub.unsubscribe(); // stop scanning
       });

     } else if (status.denied) {
       // camera permission was permanently denied
       // you must use QRScanner.openSettings() method to guide the user to the settings page
       // then they can grant the permission from there
       this.qrScanner.openSettings();
     } else {
       // permission was denied, but not permanently. You can ask for permission again at a later time.
     }
  })
  .catch((e: any) => console.log('Error is', e));
  }

  closeCamera(){
    this.showCamera = false;  
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }

  navigate(id:string){
    this.router.navigateByUrl("/add-point/"+id);
  }

  getUserInfos(){
    var userId = JSON.parse(localStorage.getItem('user')).id;
    var url = "http://www.fidelite.webantek.com/api/users/"+userId;
    this.http.get<any>(url).subscribe(data => { 
      console.log({
        type: "CONSOLE DATA",
        data: data
      })
      for(var i = 0; i < data.commerces.length; i++){
        this.param.commerces.push(data.commerces[i]);
      }

      console.log({
        type: "CONSOLE COMMERCES",
        data: this.param.commerces
      })
   
    }, error => {
      console.log({
        type: "CONSOLE ERROR",
        data: error.message
      })
    }) 
    this.param.checkUserInfos = true;     
  }

  ngOnInit(){
    this.setUser() 
  }

  ionViewDidEnter(){
    if(this.param.isLoggedIn){

      if(localStorage.getItem('commerceSelected')){
        this.param.commerceId = parseInt(JSON.parse(localStorage.getItem('commerceSelected')));
      }else{
        this.param.commerceId === null;
      }

      if(this.param.commerceId === null){
        this.commerceSelected = false;
        document.getElementById('contentScann').classList.add('whiteBackground');
      }else{
        this.commerceSelected = true;
        document.getElementById('contentScann').classList.remove('whiteBackground');
        this.scanner();   
      }
      if(this.param.checkUserInfos === false){
        this.getUserInfos();  
      }      
    }else{
      document.getElementById('contentScann').classList.add('whiteBackground');
      if(localStorage.getItem('email')){
        this.email = localStorage.getItem('email');
        this.password = localStorage.getItem('password');
        this.memoriseId = true;
      }
    }
  }

  ionViewDidLeave(){
    this.closeCamera();
  }



}
