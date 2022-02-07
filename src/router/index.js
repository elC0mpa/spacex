import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Layout from "../views/Layout.vue";
import Rockets from "../views/Rockets.vue";
import RocketDetails from "../views/RocketDetails.vue";
import Launches from "@/views/Launches.vue";
import LaunchDetails from "@/views/LaunchDetails.vue";

const routes = [
  {
    path: "/",
    name: "Layout",
    component: Layout,
    children: [
      {
        path: "",
        component: Home,
        name: "Home",
      },
      {
        path: "rockets",
        component: Rockets,
        name: "Rockets",
      },
      {
        path: "rockets/:id",
        component: RocketDetails,
        name: "RocketDetails",
      },
      {
        path: "launches/",
        component: Launches,
        name: "Launches",
      },
      {
        path: "launches/:id",
        component: LaunchDetails,
        name: "LaunchDetails",
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
