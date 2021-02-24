<template>
  <div class="content">
    <div class="col-md-8 flex-container-top">
      <h2 class="text-center">Centres List</h2>

      <base-button
        type="primary"
        round
        icon
        class="top-button"
        @click="$router.push('edit?id=-1')"
      >
        <i class="fa fa-plus"></i>
      </base-button>
    </div>

    <div class="row">
      <div class="col-md-6" v-for="cent in centres" v-bind:key="cent._id">
        <img class="rest-img" :src="cent.image" alt="..." />
        <card class="card-user">
          <p class="card-text"></p>
          <div class="author">
            <!-- <div class="block block-one"></div>
            <div class="block block-two"></div>
            <div class="block block-three"></div>
            <div class="block block-four"></div> -->

            <a href="javascript:void(0)">
              <!-- <img class="avatar" src="img/emilyz.jpg" alt="..." /> -->
              <h5 class="title">{{ cent.centre_name }}</h5>
            </a>
            <p class="description">{{ cent.address }}</p>
          </div>
          <p></p>
          <div class="card-description">
            {{ cent.description }}
          </div>
          <div slot="footer" class="rest-footer">
            
           <div>
              <button
                class="btn btn-fill"
                @click="$router.push('edit?id=' + cent._id)"
              >
                <i class="fa fa-edit"></i> Edit
              </button>
            </div>
          </div>
        </card>
      </div>
    </div>

    <div class="row loader-pos">
      <div class="sk-chase" v-if="loading">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
      </div>

      <div class="no-data-message" v-if="noDataMessage">
        <div>There are no records found</div>
      </div>
    </div>

    <!-- Classic Modal -->
  
  </div>
</template>
<script>
import { Modal, BaseAlert } from "src/components";

export default {
  data() {
    return {
      centres: [],
      loading: true,
      noDataMessage: false,
    
  
     
    };
  },
  components: {
    Modal,
    BaseAlert,
  },
  async mounted() {
    debugger;
    this.loading = true;
    let test = await this.$apiService.getCall("centre/centres");
    console.log(test);
    this.centres = test.apidata.Data;
    this.loading = false;
    if ((this.centres|| []).length == 0) {
      this.noDataMessage = true;
    }

   
  },
};
</script>
<style>
/* .rest-footer .btn-outline {
  background: transparent;
  border: .5px solid white ;
} */
</style>
