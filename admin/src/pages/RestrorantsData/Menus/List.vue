<template>
  <div class="content">
    <div class="row">
      <div class="col-md-6 flex-container-top">
        <h2 class="text-center">Menus List</h2>

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
      <div class="col-md-6" style="display: flex; justify-content: flex-end">
        <el-select
          class="select-primary"
          size="large"
          placeholder="Select Restaurant"
          v-model="RestaurantId"
          @change="onRestChange"
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
    </div>
    <div class="row">
      <div v-for="menu in menus" v-bind:key="menu._id" class="col-md-3">
        <card class="card-user">
          <p class="card-text"></p>
          <div class="author">
            <div class="block block-one"></div>
            <div class="block block-two"></div>
            <div class="block block-three"></div>
            <div class="block block-four"></div>
            <a href="javascript:void(0)">
              <img class="avatar" :src="menu.Image" alt="..." />
              <h5 class="title">{{ menu.Name }}</h5>
            </a>
            <p class="description">{{ menu.Category }}</p>
          </div>
          <p></p>
          <div class="card-description">
            {{ menu.About }}
          </div>

          <div slot="footer" class="rest-footer">
            <div class="price">{{ menu.Price }}$</div>
            <div>
              <button
                class="btn btn-fill"
                @click="$router.push('edit?id=' + menu._id)"
              >
                <i class="fa fa-edit"></i> Edit
              </button>
            </div>
          </div>
        </card>
        <div class="ribbon" v-if="menu.Discount">
          {{ menu.Discount }}% Discount
        </div>
        <div class="ribbon ribbon-is-special" v-if="menu.IsSpecial">
          Special
        </div>
        <div class="ribbon ribbon-is-deal-of-day" v-if="menu.IsDealOfTheDay">
          Deal Of the Day
        </div>
        <div class="ribbon ribbon-add-on" @click="openAddon(menu)">
          {{ (menu.Toppings || []).length }} Addons
        </div>
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

    <modal :show.sync="modals_classic" headerClasses="justify-content-center">
      <h4  slot="header" class="title title-up">{{currentMenu.Name}}</h4>
      <div class="row" v-for="top in currentMenu.Toppings" v-bind:key="top.name" >
        <div class="col-sm-6"> {{ top.Name}}</div>
        <div class="col-sm-6"> {{top.Price }}</div>
      </div>
    </modal>
  </div>
</template>
<script>
import { TimeSelect, DatePicker, Select, Option } from "element-ui";
import { json } from "d3";
import { Modal, BaseAlert } from "src/components";

export default {
  data() {
    return {
      menus: [],
      loading: true,
      noDataMessage: false,
      allrest: [],
      restlist: [],
      RestaurantId: "-1",
      modals_classic: false,
      currentMenu: {}
    };
  },
  components: {
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Option.name]: Option,
    [Select.name]: Select,
    Modal,
    BaseAlert,
  },
  async mounted() {
    debugger
    let restres = await this.$apiService.getCall("restaurant");
    this.restlist = (restres.apidata || []).map(function (r) {
      return { value: r._id, label: r.Name };
    });
    this.restlist.splice(0, 0, { value: "-1", label: "All Restaurant" });

    this.loading = true;
    let test = await this.$apiService.getCall("menus");
    console.log(test);
    this.menus = test.apidata || [];

    this.allrest = JSON.parse(JSON.stringify(test.apidata));

    this.loading = false;
    if ((this.menus || []).length == 0) {
      this.noDataMessage = true;
    }
  },
  methods: {
    
    onRestChange(ele) {
      debugger
      if (ele == "-1") {
        this.menus = this.allrest || [];
      } else {
        this.menus = (this.allrest || []).filter((m) => m.RestaurantId._id == ele);
      }
    },
    openAddon(menu) {
      this.modals_classic = true;
      this.currentMenu = menu;
    },
  },
};
</script>
<style>
</style>
