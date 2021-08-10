import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { VariablesGlobales } from '../variablesGlobales';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-point',
  templateUrl: './add-point.page.html',
  styleUrls: ['./add-point.page.scss'],
})
export class AddPointPage implements OnInit {

  id:string;
  prenom:string;
  points:number = 0;

  constructor(
      private _Activatedroute:ActivatedRoute,
      private http:HttpClient,
      private param: VariablesGlobales,
      public router: Router,
  ) { 
    this.id = this._Activatedroute.snapshot.paramMap.get("id");
  }

  getUserInfos(){
    var url = "http://www.fidelite.webantek.com/api/users/"+this.id;
    this.http.get<any>(url).subscribe(data => { 
      console.log({
        type: "CONSOLE DATA",
        data: data
      })
      this.prenom = data.prenom;
      for(var i = 0; i < data.cards.length; i++){
        if(data.cards.length > 0){
          if(data.cards[i].commerce.id === this.param.commerceId){
            this.points = data.cards[i].points
          }
        }    
      }
     
    }, error => {
      console.log({
        type: "CONSOLE ERROR",
        data: error.message
      })
    })      
  }

  upPoints(){
    let url = "http://www.fidelite.webantek.com/api/cards/up";
    this.http.post(url, {
      commerce: "/api/commerces/"+this.param.commerceId.toString(),
      user: "/api/users/"+this.id,
      points: this.points
    }).toPromise().then((response:any) => {
      console.log({
        type: "CONSOLE DATA",
        data: response
      })
      if(response["hydra:member"][0] === "success"){
        // document.getElementById('result').innerHTML = `<ion-icon name="checkmark-done-outline" color="success" style="font-size:5rem;"></ion-icon>`;
          document.getElementById('contentAddPoint').classList.add('none');
          this.router.navigateByUrl("/tabs/tab1");

        setTimeout( () => {
          document.getElementById('contentAddPoint').classList.remove('none');
        }, 2000)      
      }
    }).catch((response:any) => {
      console.log({
        type: "CONSOLE ERROR",
        data: response.error
      })
    })
  }

  pointsMore(){
    this.points++;
    document.getElementById('pointsCount').innerHTML= this.points.toString();
    console.log({
      type: "CONSOLE POINTS",
      data: this.points
    })
  }

  pointsLess(){
    if(this.points > 0){
      this.points--;
      document.getElementById('pointsCount').innerHTML= this.points.toString();
      console.log({
        type: "CONSOLE POINTS",
        data: this.points
      })
    }
  }

  ngOnInit() {
    setTimeout( () => {
      console.log(this.id)
      this.getUserInfos();
    }, 10)
    
  }

}
