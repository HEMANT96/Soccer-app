import { Component } from '@angular/core';
import { APIService } from '../api-service';
import { Router } from '@angular/router';  


@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  styleUrls: ['sign-in.page.scss'],
})
export class SignInPage {
  email = ""
  password = ""
  constructor(public apiService: APIService, private router:Router) {
  }
  async loadUser() {
    if (!this.email && !this.password ) {
      await this.apiService.presentToastWithOptions("All fields are mandatory.");
      return;
    }
    if (!this.email) {
      await this.apiService.presentToastWithOptions("email is a mandatory field.");
      return;
    }
     if (!this.password) {
      await this.apiService.presentToastWithOptions("password is a mandatory field.");
      return;
    }
    
   /*  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
      await this.apiService.presentToastWithOptions(
      "email should be valid"
      );
      return;
    } */
    await this.apiService.showLoading();

    let register = await this.apiService.postCall('user/login',{
      email : this.email ,
      password : this.password,
    });
    let apidata: any = register.apidata;
     
    console.log(apidata.Message);
   if(apidata.Message != "Success"){
    await this.apiService.presentToastWithOptions(apidata.Message);
   }
   else{
    await this.apiService.presentToastWithOptions(
      "Signed in successfully."
    );
    this.gotoNext();
   }
    console.log(register);
   
  }
  gotoNext(){  
    this.router.navigate(['home']);  
  }
  gotoPassword(){
    this.router.navigate(['/register']);  
  }
  gotoSignuUp(){  
    this.router.navigate(['/sign-up']);  
  }
  async toggleConfirmPassword() {
    const ps: any = document.getElementById("pwds");
    const imgs: any = document.getElementById("imgs");
    const srctype = ps.getAttribute("src");
    const typePwd = ps.getAttribute("type");
    if (typePwd == "text") {
      ps.setAttribute("type", "password");
    } else {
      ps.setAttribute("type", "text");
    }
  }
}
