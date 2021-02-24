import { Component } from '@angular/core';
import { APIService } from '../api-service';
import { Router,  ActivatedRoute } from '@angular/router';  
import { CommonModule, Location } from "@angular/common";
import { NgModule } from '@angular/core';


@NgModule({
  imports: [
    CommonModule,
  ]
})

@Component({
  selector: 'app-list-studio',
  templateUrl: 'list-studio.page.html',
  styleUrls: ['list-studio.page.scss'],
})
export class ListStudioPage {
     // fromTab = false
      items = []
     // searchItem = []
    //  noDataMessage = false
    //  qText = ""
    //  tempItem = []
    //  displayLoader = false
    //  centers = []
    //  query
  
  constructor(public apiService: APIService, private router: Router,  private location: Location, private route:  ActivatedRoute) {
    this.register();
   }
   ngOnInit() {
    // first way
  //  this.initMap()
  
   // this.query = this.route.queryParams;
  }
 async register() {
  let tempItems = await this.apiService.getCall('centre/centres');
  
  let apidata : any = tempItems.apidata;
  
  this.items = apidata.Data || []
 
  console.log(this.items);

 } 
/*  async register() {
  console.log("search items")
  console.log(this.searchItem);
  this.displayLoader = true;
 // const query = this.router.currentRoute.value.query;
  let fromTab = true;
  if ("q" in this.query || "catId" in this.query || "itemId" in this.query) {
    fromTab = false;
  }
  this.fromTab = fromTab;
 // let  = await $dataService.getMenu();
 
  if ("q" in this.query) {
    const qText = this.query.q as string;
    this.qText = qText;
    this.centers =
    this.centers.filter((itm: any) => {
        if (
          itm.Name &&
          itm.Name.toLowerCase().indexOf(qText.toLowerCase()) >= 0
        ) {
          return true;
        } else {
          return false;
        }
      }) || [];
  }
  if ("catId" in this.query) {
    const cText = this.query.catId as string;
    const catList = cText.split(",");
    this.centers =
      this.centers.filter((itm: any) => {
        if (catList.indexOf(itm.CategoryId._id) >= 0) {
          return true;
        } else {
          return false;
        }
      }) || [];
  }

  this.items = this.centers;
  if (this.items.length == 0) {
    this.noDataMessage = true;
  }
  this.displayLoader = false;

 } */

/* async onSearch() {
  this.displayLoader = true;
  let tempItems = await this.apiService.getCall('centre/centres');
  let apidata : any = tempItems.apidata;
  this.tempItem = apidata.Data || []
  this.tempItem =
    this.tempItem.filter((itm: any) => {
      if (
        itm.Name &&
        itm.Name.toLowerCase().indexOf(this.qText.toLowerCase()) >= 0
      ) {
        return true;
      } else {
        return false;
      }
    }) || [];
  this.items = this.tempItem;
  let searchItem = [];
  try {
    const localSearch = window.localStorage.getItem("SEARCHITEM");

    if (localSearch) searchItem = JSON.parse(localSearch);
  } catch (err) {
    console.log(err);
  }
searchItem.push({
Items:this.items
});
window.localStorage.setItem("SEARCHITEM", JSON.stringify(searchItem));

  if (this.items.length == 0) {
    this.noDataMessage = true;
  }
  this.displayLoader = false;
} */
  /*  async loadUser() {
     
     await this.apiService.showLoading();
  
 
//    
 
     console.log(this.centers)
     
   } */
   gotoback(){  
    this.location.back(); 
   } 
   gotoBookGame(id){  
     this.router.navigate(['/book-game'], { queryParams: { id: id }});  
   } 
   
 }
 