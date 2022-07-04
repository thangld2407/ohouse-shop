<template>
  <div>
    <li v-for="(route, index) in routes" :key="index">
      <b-nav-item>
        <router-link
          v-for="(child, i) in route.children"
          :key="i"
          :to="child.path"
        >
          {{ child.name }}
        </router-link>
      </b-nav-item>
    </li>
  </div>
</template>

<script>
import { constantRouter } from "../../router";
export default {
  name: "ItemNavbar",
  computed: {
    routes() {
      const route = constantRouter.filter((item) => {
        return item.path !== "/login";
      });
      return route;
    },
  },
};
</script>

<style></style>
