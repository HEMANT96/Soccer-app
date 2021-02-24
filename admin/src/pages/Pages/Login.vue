<template>
  <div class="container">
    <div class="col-lg-4 col-md-6 ml-auto mr-auto">
      <ValidationObserver v-slot="{ handleSubmit }">
        <form @submit.prevent="handleSubmit(submit)">
          <card class="card-login card-white">
            <template slot="header">
              <img src="img/card-primary.png" alt="" />
              <h1 class="card-title">Log in</h1>
            </template>

            <div>
              <ValidationProvider
                name="email"
                rules="required|email"
                v-slot="{ passed, failed, errors }"
              >
                <base-input
                  required
                  v-model="email"
                  type="email"
                  placeholder="Email"
                  addon-left-icon="tim-icons icon-email-85"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                >
                </base-input>
              </ValidationProvider>

              <ValidationProvider
                name="password"
                rules="required|min:5"
                v-slot="{ passed, failed, errors }"
              >
                <base-input
                  required
                  v-model="password"
                  placeholder="Password"
                  addon-left-icon="tim-icons icon-lock-circle"
                  type="password"
                  :error="errors[0]"
                  :class="[{ 'has-success': passed }, { 'has-danger': failed }]"
                >
                </base-input>
              </ValidationProvider>
            </div>

            <div slot="footer">
              <div v-if="invcr" style="color:#ec250d; text-align:center;"> Invalid user name and password </div>
              <base-button
                native-type="submit"
                type="primary"
                class="mb-3"
                size="lg"
                block
                @click="Login()"
              >
                Login
              </base-button>

              <!-- <div class="pull-left">
                <h6>
                  <router-link class="link footer-link" to="/register">
                    Create Account
                  </router-link>
                </h6>
              </div>

              <div class="pull-right">
                <h6><a href="#pablo" class="link footer-link">Need Help?</a></h6>
              </div> -->
            </div>
          </card>
        </form>
      </ValidationObserver>
    </div>
  </div>
</template>
<script>
import { extend } from "vee-validate";
import { required, email, min } from "vee-validate/dist/rules";

extend("email", email);
extend("min", min);

extend("required", required);

export default {
  data() {
    return {
      email: "",
      password: "",
      subscribe: true,
      invcr: false
    };
  },
  methods: {
    Login() {
      if (this.email == "admin@soccer.com" && this.password == "soccer") {
        this.$router.push("/centres");
      } else {
        this.invcr = true;
      }
    //  else if (!this.email && !this.password) {
    //     alert("Please Enter Email and Password!!");
       
    //   }
    //    else if (this.email !="admin@regrub.com" && this.password != "regrub") {
    //     alert("Invalid Email or Password");
       
    //   }

    },
  },
};
</script>
<style>
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
</style>
