import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VariablesGlobales } from '../variablesGlobales';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';


@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {

  constructor(
    private param: VariablesGlobales,
    private changeRef: ChangeDetectorRef,
    private socialSharing: SocialSharing
  ) { }

  commerceSelected:number;
  selectedText:string;


  disconnect(){
    localStorage.removeItem('user');
    localStorage.removeItem('commerceSelected');
    window.location.replace('/');
  }

  setValue() {
    console.log(this.commerceSelected);
    localStorage.setItem('commerceSelected', this.commerceSelected.toString());
    for(var i = 0; i < this.param.commerces.length; i++){
      if(this.commerceSelected === this.param.commerces[i].id){
        localStorage.setItem('nomCommerceSelected', this.param.commerces[i].nom)
        this.selectedText = this.param.commerces[i].nom;
      }
    }
  }

  changeColor(){
    var select = document.getElementsByClassName('action-sheet-button');
    
    setTimeout(() => {
      for(var i = 0; i < select.length; i++){
        select[i].classList.add('custom-options');
        select[i].children[0].classList.add('custom-options');
        console.log(select[i])
        this.changeRef.detectChanges(); 
      }
       
      console.log(select)
    }, 200)
    
  }

  share(){
    var opts = {
      message: "Viens découvrir l'application Prim's Pro !",
      subject: "Prim's Pro",
      url: "http://www.fidelite.webantek.com"
    }
    this.socialSharing.shareWithOptions(opts).catch(function(error) {
      console.log('Error sharing:', error)
    });
    // this.socialSharing.share("Viens découvrir l'application Prim's Pro !", "Prim's Pro", ["http://www.fidelite.webantek.com"])
  }

  mail(){
    window.open("mailto:contact@webantek.com?subject=Application Prim's Pro");
  }


  ngOnInit() {
    
    
  }

  ionViewDidEnter(){
    this.commerceSelected = parseInt(JSON.parse(localStorage.getItem('commerceSelected')));
    this.selectedText = localStorage.getItem('nomCommerceSelected');
  }

}
