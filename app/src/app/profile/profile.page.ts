import { Component } from '@angular/core';
import { APIService } from '../api-service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
  email = ""
  first_name = "";
  last_name= "";
  gender = "";
  address= "";
  Image = ""
  phoneNumber= "";

  constructor(public apiService: APIService, private router:Router) {
    this.getUser();
  }

  async getUser() {
    await this.apiService.showLoading();
    let userId = window.localStorage.getItem("USERID");
   
    console.log(userId);

    let profile = await this.apiService.getCall('user/userbyId/'+ userId)
    console.log(profile)
    let apidata : any =  profile.apidata;
       this.email = apidata.Data.email
       this.first_name = apidata.Data.first_name
       this.last_name = apidata.Data.last_name
       this.gender = apidata.Data.gender
       this.phoneNumber = apidata.Data.phone_number
       this.address  = apidata.Data.address
       this.Image = apidata.Data.image 
  }
}
