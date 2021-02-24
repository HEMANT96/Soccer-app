import { Component } from '@angular/core';
import { APIService } from '../api-service';
import { Router } from '@angular/router';  
import { CommonModule } from "@angular/common";
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    CommonModule
  ]
})

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  centers = []
  
  constructor(public apiService: APIService, private router: Router) {
   this.loadUser();
  }

  async loadUser() {
    
    await this.apiService.showLoading();

   // let registerById = await this.apiService.getCall('centre/centres/602003557d2d711a317ce7b3');


    let register = await this.apiService.getCall('centre/centres');
    //this.centers = register.apidata

    let apidata : any = register.apidata;

    this.centers = apidata.Data || []

    console.log(this.centers)
    
    this.gotoNext();
  }
  gotoNext(){  
    this.router.navigate(['/home']);
  }
  gotoback(){  
    this.router.navigate(['/verify-phone']);  
  } 
  gotoBookGame(id){  
    this.router.navigate(['/book-game'], { queryParams: { id: id }});  
  } 
  
}
