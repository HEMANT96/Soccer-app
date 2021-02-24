import { Component, ViewChild,  AfterContentInit, OnInit,  ElementRef } from '@angular/core';
import { SummaryPage } from '../modals/summary/summary';
import { ModalController } from '@ionic/angular';
import { APIService } from '../api-service';
import { Router, Params, ActivatedRoute } from '@angular/router';  
import { CommonModule, Location } from "@angular/common";
import { NgModule } from '@angular/core';

declare var google;


@NgModule({
  imports: [
    CommonModule
  ]
})

@Component({
  selector: 'app-book-game',
  templateUrl: 'book-game.page.html',
  styleUrls: ['book-game.page.scss'],
})
export class BookGamePage implements OnInit, AfterContentInit {
   centersById = []
   bookGames = []
   centerid

    map;
    @ViewChild('map') mapElement;
  constructor(public modalController: ModalController, public apiService: APIService, private location: Location, private router: Router, private route:  ActivatedRoute) 
  {
    this.loadUser();
  }
 

  ngAfterContentInit() {
   
        setTimeout(() => {
          this.map = new google.maps.Map(
            this.mapElement.nativeElement,
            {
              center: {lat: -34.397, lng: 150.644},
              zoom: 8
            });
        }, 3000);
    }


 ngOnInit() {
  // first way
//  this.initMap()

  this.centerid = this.route.snapshot.queryParamMap.get("id");
}

  async presentModal() {
    this.bookGame();
    const modal = await this.modalController.create({
      component: SummaryPage,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  async loadUser() {
    
    await this.apiService.showLoading();
     // console.log(this.id)
    let registers = await this.apiService.getCall('centre/centrebyId/'+ this.centerid );


    //let register = await this.apiService.getCall('centre/centres');
    //this.centers = register.apidata

    let apidata : any = registers.apidata;

    this.centersById = apidata.Data || []
    
    console.log(this.centersById);


  }
  async bookGame(){
    await this.apiService.showLoading();

    let bookGame = await this.apiService.postCall('booking/add-booking', {
       centre_id :"602003557d2d711a317ce7b3",
       user_id :"601ab5bfe5549129449f1b62",
       start_time : "5:30",
       end_time : "9:30",
       booking_date : "2021-02-09"
    });

    let apidata : any = bookGame.apidata;
    this.bookGames = apidata.Data || []
    console.log(this.bookGames)
  }

  gotoNext(){  
    this.router.navigate(['/home']);
  }
  gotoback(){  
    this.location.back(); 
   } 
  gotoBookGame(id){  
    this.router.navigate(['book-game'], { queryParams: { id: id }});  
  }   
}
