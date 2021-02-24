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

      <h2 v-if="!isEdit" class="text-center">Add Centre</h2>
      <h2 v-if="isEdit" class="text-center">Edit Centre</h2>
    </div>
    <div class="row">
      <div class="col-md-8">
        <card>
          <!-- <h5 slot="header" v-if="!isEdit" class="title">New Restaurant</h5>
          <h5 slot="header" v-if="isEdit" class="title">Edit Restaurant</h5> -->
          <form>
            <div class="row">
              <div class="col-md-6">
                <base-input
                  type="text"
                  label="Name *"
                  maxlength="100"
                  placeholder="Name"
                  v-model="centre_name"
                >
                  <!-- {{ rstr.Name }} -->
                </base-input>
              </div>

              <div class="col-md-6">
                <base-input
                  type="tel"
                  maxlength="10"
                  label="Phone Number *"
                  placeholder="Phone Number"
                  v-model="phone_number"
                  @keyup="onlyNumeric"
                >
                  <!-- {{ rstr.Name }} -->
                </base-input>
              </div>

              <div class="col-md-6">
                <base-input
                  type="number"
                  label="Total Slots *"
                  placeholder="Total Slots"
                  v-model="total_slots"
                >
                  <!-- {{ rstr.Name }} -->
                </base-input>
              </div>
              <!-- <div class="col-md-3">
               

            <div class="row">
              <div class="col-md-6">
                <base-input
                  type="text"
                  label="First Name"
                  placeholder="First Name"
                
                >
                </base-input>
              </div>
              <div class="col-md-6">
                <base-input
                  type="text"
                  label="Last Name"
                  placeholder="Last Name"
                
                >
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input
                  type="text"
                  label="Address"
                  placeholder="Home Address"
                 
                >
                </base-input>
              </div> -->
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input
                  type="text"
                  label="Address *"
                  maxlength="250"
                  placeholder="Address"
                  v-model="address"
                >
                  <!-- {{ rstr.Title }} -->
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input label="Description *">
                  <textarea
                    class="form-control"
                    placeholder="Description"
                    v-model="description"
                  >
                  </textarea>
                </base-input>
              </div>
            </div>

            <base-button
              v-if="!isEdit"
              native-type="submit"
              type="primary"
              @click="AddCent()"
              class="btn-fill"
              :disabled="loading"
            >
              Save
            </base-button>

            <base-button
              v-if="isEdit"
              native-type="submit"
              type="primary"
              @click="UpdateCent()"
              class="btn-fill"
              :disabled="loading"
            >
              Update
            </base-button>
          </form>
        </card>
      </div>
      <div class="col-md-4" v-for="user in [1]" v-bind:key="user">
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
              <h4 class="card-title">Centre Image</h4>
              <image-upload
                :src="image"
                @change="onImageChange"
                select-text="Select Image"
              />
            </div>
            <div class="col-md-12 col-sm-12" v-if="isEdit">
              <h4 class="card-title">Centre Image</h4>
              <image-upload
                :src="image"
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
// import UserCard from "../Pages/UserProfile/UserCard.vue";

import { ImageUpload } from "src/components/index";
import { image } from "vee-validate/dist/rules";

export default {
  components: {
    ImageUpload,
  },
  data() {
    return {
      address: "",
      centre_name: "",
      phone_number: "",
      total_slots: "",
      description: "",
      image: null,
      isEdit: false,
      loading: false,
      imageUploaded: false,
    };
  },

  async mounted() {
    debugger;
    console.log(this.$route.query.id);
    var id = this.$route.query.id;
    if (id == -1) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      let cent = await this.$apiService.getCall("centre/centrebyId/" + id);
      console.log(cent);

      this.phone_number = cent.apidata.Data.phone_number;
      this.centre_name = cent.apidata.Data.centre_name;
      this.address = cent.apidata.Data.address;
      this.total_slots = cent.apidata.Data.total_slots;
      this.image = cent.apidata.Data.image;
      this.description = cent.apidata.Data.description;
    }
  },
  methods: {
    async UpdateCent() {
      debugger;
      var id = this.$route.query.id;
      if (
        !this.centre_name &&
        !this.address &&
        !this.image &&
        !this.phone_number &&
        !this.total_slots &&
        !this.description
      ) {
        this.$apiService.notify("All fields are mandatory.");
        return;
      }
      if (!this.centre_name) {
        this.$apiService.notify("Name is mandatory.");
        return;
      }
      if (!this.phone_number) {
        this.$apiService.notify("Phone number is mandatory.");
        return;
      }
       if (!this.total_slots) {
        this.$apiService.notify("Slot is mandatory.");
        return;
      }
      if (!this.address) {
        this.$apiService.notify("Address is mandatory.");
        return;
      }
     
       if (!this.description) {
        this.$apiService.notify("Description is mandatory.");
        return;
      }
       if (!/^\d{10}$/.test(this.phone_number)) {
         this.$apiService.notify(
          "Phone number should be of 10 digits."
        );
        return;
      }

      this.loading = true;

      let imageUrl = this.image;
      if (this.imageUploaded) {
        imageUrl = await this.$apiService.uploadImage(this.image);
      }

      var Centdata = {
        centre_name: this.centre_name,
        address: this.address, // this is address
        phone_number: this.phone_number,
        total_slots: this.total_slots,
        description: this.description,
        image: imageUrl, // this.Image,
      };

      var update_cent = await this.$apiService.postCall(
        "centre/center-update/" + id,
        Centdata
      );
      console.log(update_cent);

      this.$apiService.notify("Centre has been updated.");
      this.$router.push("/centres/list");
    },
    async AddCent() {
      if (
        !this.centre_name &&
        !this.address &&
        !this.image &&
        !this.phone_number &&
        !this.total_slots &&
        !this.description
      ) {
        this.$apiService.notify("All fields are mandatory.");
        return;
      }
      if (!this.centre_name) {
        this.$apiService.notify("Name is mandatory.");
        return;
      }
      if (!this.phone_number) {
        this.$apiService.notify("Phone number is mandatory.");
        return;
      }
       if (!this.total_slots) {
        this.$apiService.notify("Slot is mandatory.");
        return;
      }
      if (!this.address) {
        this.$apiService.notify("Address is mandatory.");
        return;
      }
      
       if (!this.description) {
        this.$apiService.notify("Description is mandatory.");
        return;
      }
          if (!/^\d{10}$/.test(this.phone_number)) {
         this.$apiService.notify(
          "Phone number should be of 10 digits."
        );
        return;
      }
      this.loading = true;

      const imageUrl = await this.$apiService.uploadImage(this.image);

      var add_cent = this.$apiService.postCall("centre/add", {
        centre_name: this.centre_name,
        address: this.address,
        phone_number: this.phone_number,
        total_slots: this.total_slots,
        description: this.description,
        image: imageUrl,
      });

      this.loading = false;
      console.log(add_cent);

      this.$toasted.show("Centre has been added.", { duration: 2000 });
      this.$router.push("/Centres/list");
    },

    onImageChange(file) {
      this.image = file;
      this.imageUploaded = true;
    },
    onlyNumeric() {
      this.phone_number = this.phone_number.replace(/[^0-9]/g, "");
    },
  },
};
</script>
<style></style>
