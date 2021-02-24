import { Component } from '@angular/core';
import { APIService } from '../api-service';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-account-info',
  templateUrl: 'account-info.page.html',
  styleUrls: ['account-info.page.scss'],
})
export class AccountInfoPage {
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
       this.Image = apidata.Data.image || "../../assets/pro.png"
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
    if (!this.phoneNumber) {
      await this.apiService.presentToastWithOptions("Address is mandatory field.");
      return;
    }
  
    await this.apiService.showLoading();

  //  const imageUrl = await $apiService.uploadImage(this.Image);
           console.log("hello")
    let register = await this.apiService.postCall('user/updateprofile',{
      email: this.email,
      first_name: this.first_name,
      last_name: this.last_name,
      gender: this.gender,
      address: this.address,
      phone_number: this.phoneNumber,
      image :  "../../assets/pro.png"
    });
    console.log(this.Image)

   let apidata: any = register.apidata ;
    
   if(apidata.Message != "Success" )
   {
    await this.apiService.presentToastWithOptions(apidata.Message);
   }
   else 
   {
    await this.apiService.presentToastWithOptions("profile has been updated successfully.");
    this.gotoNext()
   }
  }
  gotoNext(){  
    this.router.navigate(['/profile']);  
  }
  gotoBack(){  
    this.router.navigate(['/sign-in']);  
  }
  setSrc() {
    const input: any = document.getElementById("fileInput");
    if (input.files && input.files[0]) {
      const fileName = input.files[0].name;
      const ext = fileName.split('.').pop(); // substring(fileName.indexOf(".") + 1 , fileName.length);
      if (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg") {
        this.Image = input.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
          const imgid: any = document.getElementById("imgid");
          imgid.src =  e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
  openDialog(){
    document.getElementById("fileInput").click();
  }
 
}
