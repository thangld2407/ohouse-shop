<template>
  <div>
    <Navbar />
    <AppMain />
  </div>
</template>

<script>
import { constantRouter } from "../../router/index";
import Navbar from "../Navbar";
import AppMain from "../Navbar/AppMain.vue";
export default {
  name: "Layout",
  components: {
    Navbar,
    AppMain,
  },
  computed: {
    routes() {
      const route = constantRouter.filter((item) => {
        return item.path !== "/login";
      });
      return route;
    },
    key() {
      return this.$route.fullPath;
    },
  },
};
</script>

<style></style>
