import { Component } from '@angular/core';
import { APIService } from '../api-service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-sign-up',
  templateUrl: 'sign-up.page.html',
  styleUrls: ['sign-up.page.scss'],
})
export class SignUpPage {
  email = ""
  first_name = "";
  last_name= "";
  gender = "";
  address= "";

  constructor(public apiService: APIService, private router:Router) {
  }

  async loadUser() {
    if (!this.email && !this.first_name && !this.last_name && !this.gender && !this.address) {
      await this.apiService.presentToastWithOptions("All fields are mandatory.");
      return;
    }
    if (!this.first_name) {
      await this.apiService.presentToastWithOptions("First name is mandatory field.");
      return;
    }
    if (!this.last_name) {
      await this.apiService.presentToastWithOptions("Last name is mandatory field.");
      return;
    }
    if (!this.gender) {
      await this.apiService.presentToastWithOptions("Gender is mandatory field.");
      return;
    }
    if (!this.address) {
      await this.apiService.presentToastWithOptions("Address is mandatory field.");
      return;
    }
  /*   if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      await this.apiService.presentToastWithOptions(
      "email should be valid"
      );
      return;
    } */
    await this.apiService.showLoading();

    let register = await this.apiService.postCall('user/register',{
      email: this.email ,
      first_name: this.first_name,
      last_name: this.last_name,
      gender : this.gender,
      address: this.address,
      phone_number: 9999345632
    });
    let apidata: any = register.apidata

     window.localStorage.setItem("USERID", apidata.Data?._id);

 // if(register.apidata.Message != 'Success'){
   // await this.apiService.presentToastWithOptions(
  //    register.apidata.Message
    //  );
 // }
//  else{
    console.log(register.apidata);
    
    await this.apiService.presentToastWithOptions("sign-up has been done successfully.");

    this.gotoNext()
 // }
  }
  gotoNext(){  
    this.router.navigate(['/verify-phone']);  
  }
  gotoBack(){  
    this.router.navigate(['/sign-in']);  
  }
}
