<template>
  <div class="content">
    <div class="col-md-8 flex-container-top">
      <h2 class="text-center">Categories List</h2>

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
      <div
      
        class="col-md-4" v-for="cat in categories" v-bind:key="cat._id"
      >
        <card
          class="card-user cat-card"
          v-bind:style="{ 'background-color': cat.BackColor }"
        >
          <!-- <div class="color-box"></div> -->
          <p class="card-text"></p>
          <div class="author">
            <!-- <div class="block block-one"></div>
            <div class="block block-two"></div>
            <div class="block block-three"></div>
            <div class="block block-four"></div> -->

            <a href="javascript:void(0)">
              <div class="cat-images">
                <div class="avatar img-div">
                  <img
                    :src="cat.Image"
                    alt="..."
                  />
                </div>
                <div class="avatar img-div img-cat-icon">
                  <img class="cat-image" :src="cat.Icon" alt="..." />
                </div>
              </div>

              <h5 class="title">{{cat.Name}}</h5>
            </a>
            <!-- <p class="description">Ceo/Co-Founder</p> -->
          </div>
          <p></p>
          <div class="card-description">
           {{cat.About}}
          </div>

          <div slot="footer" class="rest-footer">
            <div>
              <button class="btn btn-fill" @click="$router.push('edit?id=' + cat._id)">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      categories: [],
      loading: true,
      noDataMessage: false,
    };
  },
  components: {},
  async mounted() {
    this.loading = true;
    let test = await this.$apiService.getCall("categories");
    console.log(test);
    this.categories = test.apidata;
    this.loading = false;
    if ((this.categories || []).length == 0) {
      this.noDataMessage = true;
    }
  },
};
</script>
<style>
.cat-images {
  display: flex;
  justify-content: space-evenly;
}

.cat-image {
  padding: 20px;
  object-fit: none;
  border: none;
  margin-bottom: 0px;
}
.card-description {
  color: #9c9eaf;
  padding-top: 4px;
  font-family: poppins;
  font-weight: 400;
  font-size: 14px;
  width: 100%;
  height: 37px;
  line-height: 16px;
  letter-spacing: 0em;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.img-div {
  border: 5px solid #2b3553 !important;
  background-color: #f1f3f8 !important;
}

.img-cat-icon {
  border: 5px solid #f1f3f8 !important;
}

.color-box {
  width: 100%;
  height: 200px;
  background-color: red;
}
</style>
