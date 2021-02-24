<template>
  <div class="content">
    <div class="col-md-8 flex-container-top">
      <base-button
        type="primary"
        round
        icon
        class="top-button-back"
        @click="$router.push('list')"
      >
        <i class="fa fa-arrow-left"></i>
      </base-button>

      <h2 v-if="!isEdit" class="text-center">Add Menu</h2>
      <h2 v-if="isEdit" class="text-center">Edit Menu</h2>
    </div>
    <div class="row">
      <div class="col-md-8">
        <card>
          <!-- <h5 slot="header" v-if="!isEdit" class="title">New Menus</h5>
          <h5 slot="header" v-if="isEdit" class="title">Edit Menus</h5> -->
          <form>
            <div class="row" style="margin-bottom: 10px">
              <div class="col-md-6 star">
                <el-select
                  class="select-primary"
                  size="large"
                  placeholder="Select Restaurant *"
                  v-model="RestaurantId"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in restlist"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  >
                  </el-option>
                </el-select>
              </div>

              <div class="col-md-6 star">
                <el-select
                  class="select-primary"
                  size="large"
                  placeholder="Select Category *"
                  v-model="CategoryId"
                  style="width: 100%"
                >
                  <el-option
                    v-for="option in catlist"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  >
                  </el-option>
                </el-select>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <base-input
                  type="text"
                  label="Name *"
                  maxlength="100"
                  placeholder="Name"
                  v-model="Name"
                >
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6">
                <base-input
                  type="Number"
                  label="Price *"
                  oninvalid="return false"
                  placeholder="Price"
                  v-model="Price"
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  type="Number"
                  label="Discount *"
                  onKeyPress="if(this.value.length==3) return false;"
                  placeholder="Discount"
                  v-model="Discount"
                >
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input label="About *">
                  <textarea
                    class="form-control"
                    placeholder="About "
                    v-model="About"
                  >
                  </textarea>
                </base-input>
              </div>
            </div>

            <h3 style="margin-top: 20px">App Details</h3>

            <div class="row">
              <div class="col-md-6">
                <base-checkbox v-model="IsSpecial">Is Special</base-checkbox>
              </div>
              <div class="col-md-6">
                <base-checkbox v-model="IsDealOfTheDay"
                  >Deal Of the Day</base-checkbox
                >
              </div>
            </div>

            <h3 style="margin-top: 20px">
              Addons
              <base-button type="primary" round icon @click="addRow">
                <i class="fa fa-plus"></i>
              </base-button>
            </h3>

            <div
              class="row"
              v-for="(topping, index) in Toppings"
              v-bind:key="topping.name"
            >
              <div class="col-md-4">
                <base-input
                  type="text"
                  label="Name"
                  maxlength="100"
                  placeholder="Name"
                  v-model="topping.Name"
                >
                </base-input>
              </div>
              <div class="col-md-4">
                <base-input
                  type="text"
                  label="Price"
                  maxlength="100"
                  placeholder="Price"
                  v-model="topping.Price"
                >
                </base-input>
              </div>
              <div class="col-md-4">
                <base-button
                  native-type="submit"
                  type="primary"
                  @click="removeToppings(index)"
                  class="btn-fill"
                  :disabled="loading"
                  style="margin-top: 20px"
                >
                  Remove
                </base-button>
              </div>
            </div>

            <base-button
              v-if="!isEdit"
              native-type="submit"
              type="primary"
              @click="AddRestMenus()"
              class="btn-fill"
              :disabled="loading"
            >
              Save
            </base-button>

            <base-button
              v-if="isEdit"
              native-type="submit"
              type="primary"
              @click="updateMenus()"
              class="btn-fill"
              :disabled="loading"
            >
              Update
            </base-button>
          </form>
        </card>
      </div>

      <div class="col-md-4">
        <card class="card-user">
          <p class="card-text"></p>
          <div class="author">
            <div class="block block-one"></div>
            <div class="block block-two"></div>
            <div class="block block-three"></div>
            <div class="block block-four"></div>
            <!-- <a href="javascript:void(0)">
              <img class="avatar" src="img/emilyz.jpg" alt="..." />
              <h5 class="title">Mike Andrew</h5>
            </a>
            <p class="description">Ceo/Co-Founder</p> -->

            <div class="col-md-12 col-sm-12" v-if="!isEdit">
              <h4 class="card-title">Menu Image</h4>
              <image-upload
                :src="Image"
                @change="onImageChange"
                select-text="Select Image"
              />
            </div>
            <div class="col-md-12 col-sm-12" v-if="isEdit">
              <h4 class="card-title">Menu Image</h4>
              <image-upload
                :src="Image"
                @change="onImageChange"
                select-text="Update Image"
              />
            </div>
          </div>
        </card>
      </div>
    </div>
    <div class="full-screen-loader" v-if="loading">
      <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { TimeSelect, DatePicker, Select, Option } from "element-ui";
import { ImageUpload, BaseCheckbox } from "src/components/index";

export default {
  components: {
    ImageUpload,
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Option.name]: Option,
    [Select.name]: Select,
    BaseCheckbox,
  },
  data() {
    return {
      Name: "",
      About: "",
      Price: "",
      Discount: "",
      Available: "",
      PhoneNumber: "",
      Image: null,
      isEdit: false,
      IsSpecial: false,
      IsDealOfTheDay: false,
      loading: false,
      restlist: [],
      catlist: [],
      RestaurantId: "",
      CategoryId: "",
      Toppings: [],
    };
  },
  async mounted() {
    // let restres = await this.$apiService.getCall("restaurant");
    // this.restlist = (restres.apidata || []).map(function (r) {
    //   return { value: r._id, label: r.Name };
    // });

    let restres = await this.$apiService.getCall("restaurant");
    this.restlist = (restres.apidata || []).map(function (r) {
      return { value: r._id, label: r.Name };
    });

    let catres = await this.$apiService.getCall("categories");
    this.catlist = (catres.apidata || []).map(function (r) {
      return { value: r._id, label: r.Name };
    });

    console.log(this.$route.query.id);
    var id = this.$route.query.id;
    if (id == -1) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      let restrmenus = await this.$apiService.getCall("menus/" + id);
      console.log(restrmenus);
      this.Name = restrmenus.apidata.Name;
      this.About = restrmenus.apidata.About;
      this.Price = restrmenus.apidata.Price;
      this.Discount = restrmenus.apidata.Discount;
      this.Available = restrmenus.apidata.Available;
      this.Image = restrmenus.apidata.Image;
      this.IsSpecial = restrmenus.apidata.IsSpecial;
      this.IsDealOfTheDay = restrmenus.apidata.IsDealOfTheDay;
      this.RestaurantId = restrmenus.apidata.RestaurantId._id;
      this.CategoryId = restrmenus.apidata.CategoryId._id;
      this.Toppings = restrmenus.apidata.Toppings || [];
    }
  },
  methods: {
    addRow() {
      this.Toppings.push({ Name: "", Price: null });
    },
    removeToppings(index) {
      this.Toppings.splice(index, 1);
    },
    async updateMenus() {
      if (
        !this.Name &&
        !this.About &&
        !this.Price &&
        !this.RestaurantId &&
        !this.CategoryId
      ) {
        this.$apiService.notify("All fields are mandatory.");
        return;
      }

      if (!this.RestaurantId) {
        this.$apiService.notify("Restarurant is mandatory.");
        return;
      }
      if (!this.CategoryId) {
        this.$apiService.notify("Category is mandatory.");
        return;
      }

      if (!this.Name) {
        this.$apiService.notify("Name is mandatory.");
        return;
      }
      if (!this.Price) {
        this.$apiService.notify("Price is mandatory.");
        return;
      }
      if (!this.About) {
        this.$apiService.notify("About is mandatory.");
        return;
      }

      if (this.Discount > 100) {
        this.$apiService.notify("Discount value can not be greater than 100%.");
        return;
      }
      if (!this.Image) {
        this.$apiService.notify("Image is mandatory.");
        return;
      }
      var id = this.$route.query.id;

      this.loading = true;

      let imageUrl = this.Image;
      if (this.imageUploaded) {
        imageUrl = await this.$apiService.uploadImage(this.Image);
      }

      var RestMenusdata = {
        Name: this.Name,
        About: this.About,
        Price: this.Price,
        Discount: this.Discount,
        Available: this.Available, // Avilable
        Image: imageUrl,
        RestaurantId: this.RestaurantId,
        CategoryId: this.CategoryId,
        IsSpecial: this.IsSpecial,
        IsDealOfTheDay: this.IsDealOfTheDay,
        Toppings: this.Toppings,
      };
      var update_rest = await this.$apiService.putCall(
        "menus/update/" + id,
        RestMenusdata
      );
      console.log(update_rest);
         
      this.$apiService.notify("Menu has been updated.");
      this.$router.push("/menus/list");
    },
    async AddRestMenus() {
      if (
        !this.Name &&
        !this.About &&
        !this.Price &&
        !this.RestaurantId &&
        !this.CategoryId
      ) {
        this.$apiService.notify("All fields are mandatory.");
        return;
      }
       if (!this.RestaurantId) {
        this.$apiService.notify("Restaurant is mandatory.");
        return;
      }
      if (!this.CategoryId) {
        this.$apiService.notify("Category is mandatory.");
        return;
      }
      if (!this.Name) {
        this.$apiService.notify("Name is mandatory.");
        return;
      }
      if (!this.Price) {
        this.$apiService.notify("Price is mandatory.");
        return;
      }
      if (!this.About) {
        this.$apiService.notify("About is mandatory.");
        return;
      }

      // if (!this.Discount) {
      //   this.$apiService.notify("Discount is mandatory");
      //   return;
      // }
      if (this.Discount > 100) {
        this.$apiService.notify("Discount value can not be greater than 100%.");
        return;
      }
      if (!this.Image) {
        this.$apiService.notify("Image is mandatory.");
        return;
      }
      this.loading = true;

      const imageUrl = await this.$apiService.uploadImage(this.Image);

      var test = await this.$apiService.postCall("menus/add", {
        Name: this.Name,
        About: this.About,
        Price: this.Price,
        Discount: this.Discount,
        Image: imageUrl,
        IsSpecial: this.IsSpecial,
        IsDealOfTheDay: this.IsDealOfTheDay,
        RestaurantId: this.RestaurantId,
        CategoryId: this.CategoryId,
        Toppings: this.Toppings,
      });
      this.loading = false;
      console.log(test);
      if(test.apidata.error){
        this.$apiService.notify(test.apidata.error);
      } else {
       this.$apiService.notify("Menu has been added.");
       this.$router.push("/menus/list");
      }
    
    },
    onImageChange(file) {
      this.Image = file;
      this.imageUploaded = true;
    },
  },
};
</script>
<style>
.star {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
