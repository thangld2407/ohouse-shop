<template>
  <div id="landing" class="landing">
    <b-spinner v-if="isLoading" type="grow" label="Loading..."></b-spinner>
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h1 class="title">Ohouse Shop</h1>
          <h2 class="sub-title">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </h2>
          <div class="btn-group">
            <router-link to="/login" class="btn btn-primary">
              Login
            </router-link>
            <router-link to="/register" class="btn btn-primary">
              Register
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LandingPages",
  data() {
    return {
      isLoading: true,
    };
  },
};
</script>
