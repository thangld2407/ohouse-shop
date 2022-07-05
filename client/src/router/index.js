import Vue from "vue";
import VueRouter from "vue-router";
import LoginPages from "../views/Login";
import UserPage from "../views/User";
import Layout from "../components/Layout";
import ForgotPassword from "../views/ForgotPassword";
Vue.use(VueRouter);
const isLogin = true;

export const constantRouter = [
  {
    name: "Login",
    path: "/login",
    component: LoginPages,
    hidden: true
  },
  {
    name: "ForgotPassword",
    path: "/forgot-password",
    hidden: true,
    component: ForgotPassword,
  },
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "user",
        name: "User",
        component: () =>
          import(/* webpackChunkName: "User" */ "../views/User/index.vue"),
      },
      {
        path: "product",
        name: "Product",
        component: () =>
          import(
            /* webpackChunkName: "Product" */ "../views/Products/index.vue"
          ),
      },
      {
        path: "landing",
        name: "LandingPages",
        component: () =>
          import(
            /* webpackChunkName: "Product" */ "../views/Landing/index.vue"
          ),
      },
    ],
  },
  {
    path: "/",
    name: "Layout",
    children: [
      
    ],
  },
];

const router = new VueRouter({
  routes: constantRouter,
  mode: "history",
  scrollBehavior: () => ({ y: 0 }),
});

export default router;
