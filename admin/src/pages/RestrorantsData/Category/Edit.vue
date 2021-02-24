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

      <h2 v-if="!isEdit" class="text-center">Add Category</h2>
      <h2 v-if="isEdit" class="text-center">Edit Category</h2>
    </div>
    <div class="row">
      <div class="col-md-6">
        <card>
          <!-- <h5 v-if="isEdit" slot="header" class="title">Edit Category</h5>
          <h5 v-if="!isEdit" slot="header" class="title">New Category</h5> -->
          <form>
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
              <div class="col-md-6">
                <base-input
                  type="text"
                  label="Background Color *"
                  placeholder="Color"
                >
                  <input
                    type="color"
                    class="form-control"
                    style="padding: 0px"
                    v-model="color"
                  />
                </base-input>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <base-input label="About Category *">
                  <textarea
                    class="form-control"
                    placeholder="About "
                    v-model="About"
                  >
                  </textarea>
                </base-input>
              </div>
            </div>

            <base-button
              v-if="!isEdit"
              native-type="submit"
              type="primary"
              @click="AddCat()"
              class="btn-fill"
              :disabled="loading"
            >
              Save
            </base-button>
            <base-button
              v-if="isEdit"
              native-type="submit"
              type="primary"
              @click="UpdateCat()"
              class="btn-fill"
              :disabled="loading"
            >
              Update
            </base-button>
          </form>
        </card>
      </div>
      <div class="col-md-3">
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
              <h4 class="card-title">Category Image</h4>
              <image-upload
                :src="Image"
                @change="onImageChange"
                select-text="Select Image"
              />
            </div>
            <div class="col-md-12 col-sm-12" v-if="isEdit">
              <h4 class="card-title">Category Image</h4>
              <image-upload
                :src="Image"
                @change="onImageChange"
                select-text="Update Image"
              />
            </div>
          </div>
        </card>
      </div>

      <div class="col-md-3">
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
              <h4 class="card-title">Category Icon</h4>
              <image-upload
                :src="Icon"
                @change="onIconChange"
                select-text="Select Icon"
              />
            </div>
            <div class="col-md-12 col-sm-12" v-if="isEdit">
              <h4 class="card-title">Category Icon</h4>
              <image-upload
                :src="Icon"
                @change="onIconChange"
                select-text="Update Icon"
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
// import UserCard from "../../Pages/UserProfile/UserCard.vue";

import { ImageUpload } from "src/components/index";

export default {
  components: {
    ImageUpload,
  },
  data() {
    return {
      Name: "",
      color: "#000000",
      About: "",
      Image: null,
      Icon: null,
      isEdit: false,
      loading: false,
      imageUploaded: false,
      iconUploaded: false,
    };
  },
  async mounted() {
    console.log(this.$route.query.id);
    var id = this.$route.query.id;
    if (id == -1) {
      this.isEdit = false;
    } else {
      this.isEdit = true;
      let categ = await this.$apiService.getCall("categories/" + id);
      console.log(categ);
      this.About = categ.apidata.About;
      this.Name = categ.apidata.Name;
      this.color = categ.apidata.BackColor;
      this.Icon = categ.apidata.Icon;
      this.Image = categ.apidata.Image;
    }
  },
  methods: {
    // updateProfile() {
    //   alert('Your data: ' + JSON.stringify(this.user));
    // },
    async AddCat() {

       if (
        !this.Name ||
        !this.About ||
        !this.color ||
        !this.Icon ||
        !this.Image
      ) {
        this.$apiService.notify("All fields are mandatory.");
        return;
      }
      if (!this.Name) {
        this.$apiService.notify("Name is mandatory.");
        return;
      }
      if (!this.About) {
        this.$apiService.notify("About is mandatory.");
        return;
      }
      if (!this.color) {
        this.$apiService.notify("color is mandatory.");
        return;
      }
      if (!this.Image) {
        this.$apiService.notify("Image is mandatory.");
        return;
      }
      if (!this.Icon) {
        this.$apiService.notify("Icon is mandatory.");
        return;
      }

      this.loading = true;

      const imageUrl = await this.$apiService.uploadImage(this.Image);
      const iconUrl = await this.$apiService.uploadImage(this.Icon);
      var test = await this.$apiService.postCall("categories/add", {
        Name: this.Name,
        About: this.About,
        BackColor: this.color,
        // Title: this.Address,
        Image: imageUrl,
        Icon: iconUrl,
      });
       console.log(test);
         this.loading = false;
      if(test.apidata.error){
        this.$apiService.notify(test.apidata.error);
      } else {
        this.$apiService.notify("Category has been added.");
        this.$router.push("/categories/list");
      }
     
    },
    onImageChange(file) {
      this.Image = file;
      this.imageUploaded = true;
    },
    onIconChange(file) {
      this.Icon = file;
      this.iconUploaded = true;
    },

    async UpdateCat() {
      var id = this.$route.query.id;

      if (
        !this.Name ||
        !this.About ||
        !this.color ||
        !this.Icon ||
        !this.Image
      ) {
        this.$apiService.notify("All fields are mandatory.");
        return;
      }

      if (!this.Name) {
        this.$apiService.notify("Name is mandatory.");
        return;
      }
      if (!this.About) {
        this.$apiService.notify("About is mandatory.");
        return;
      }
      if (!this.color) {
        this.$apiService.notify("Color is mandatory.");
        return;
      }
      if (!this.Image) {
        this.$apiService.notify("Image is mandatory.");
        return;
      }
            if (!this.Icon) {
        this.$apiService.notify("Icon is mandatory.");
        return;
      }
      this.loading = true;

      let imageUrl = this.Image;
      if (this.imageUploaded) {
        imageUrl = await this.$apiService.uploadImage(this.Image);
      }
      let iconUrl = this.Icon;
      if (this.iconUploaded) {
        iconUrl = await this.$apiService.uploadImage(this.Icon);
      }
      var Catdata = {
        Name: this.Name,
        About: this.About,
        BackColor: this.color,
        Image: imageUrl,
        Icon: iconUrl,
      };

      var update_rest = await this.$apiService.putCall(
        "categories/update/" + id,
        Catdata
      );
      console.log(update_rest);

      this.$apiService.notify("Category has been updated.");
      this.$router.push("/categories/list");
    },
  },
};
</script>
<style></style>
