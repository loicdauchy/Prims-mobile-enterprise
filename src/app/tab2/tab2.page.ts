import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { VariablesGlobales } from '../variablesGlobales';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{

  cards = [];
  colors = ["#1abc9c", "#2ecc71", "#3498db", "#9b59b6", "#34495e", "#16a085", "#27ae60", "#2980b9", "#8e44ad", "#2c3e50", "#f1c40f", "#e67e22", "#e74c3c", "#95a5a6", "#f39c12", "#d35400", "#c0392b", "#bdc3c7", "#7f8c8d"];

  constructor(
      private http: HttpClient,
      private param: VariablesGlobales,
  ) {}


  getClients(){
    let url = "http://www.fidelite.webantek.com/api/cards/commerces";
    this.http.post(url, {
      commerce: "/api/commerces/"+this.param.commerceId.toString(),
    }).toPromise().then((response:any) => {
      console.log(response);
      if(response["hydra:member"][0] === "success"){
        for(var i = 0; i < response["hydra:member"][1].length; i++){
          this.cards.push(response["hydra:member"][1][i]);
        }
        setTimeout(()=>{
          this.displayAvatar();
        },100)
        
      }
    })
  }

  generateAvatar(
    text:string,
    foregroundColor = "white",
    backgroundColor = "black"
  ) {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
  
    canvas.width = 200;
    canvas.height = 200;
  
    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
  
    // Draw text
    context.font = "bold 100px arial";
    context.fillStyle = foregroundColor;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, canvas.width / 2, canvas.height / 2);
  
    return canvas.toDataURL("image/png");
  }

  displayAvatar(){
    for(var i = 0; i < this.cards.length; i++){
      var initial = this.cards[i].user.nom.slice(0, 1) + this.cards[i].user.prenom.slice(0, 1);
      var ionAvatar = document.getElementById("avatar"+this.cards[i].id);
      var img = document.createElement('img');
      img.alt = "avatar de "+initial;
      img.src = this.generateAvatar(
        initial,
        "white",
        this.colors[Math.floor(Math.random()*19)]
      );
      ionAvatar.appendChild(img);
    }
  }

  mail(mail:string){
    window.open("mailto:"+mail+"?subject=Application Prim's Pro");
  }

  


  ionViewDidEnter(){
    this.param.commerceId = parseInt(JSON.parse(localStorage.getItem('commerceSelected')));
    this.getClients();  
  }
  ionViewDidLeave(){
    this.cards = [];
  }

}
