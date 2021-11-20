import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../views/Layout.vue";
import Rockets from "../views/Rockets.vue";
import RocketDetails from "../views/RocketDetails.vue";

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "",
        component: Home,
      },
      {
        path: "rockets",
        component: Rockets,
      },
      {
        path: "rockets/:id",
        component: RocketDetails,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
