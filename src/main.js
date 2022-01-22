import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/scss/main.scss";
import { ObserveVisibility } from "vue-observe-visibility";
import { vfmPlugin } from "vue-final-modal";

const app = createApp(App);

app.directive("observe-visibility", {
  beforeMount: (el, binding, vnode) => {
    vnode.context = binding.instance;
    ObserveVisibility.bind(el, binding, vnode);
  },
  update: ObserveVisibility.update,
  unmounted: ObserveVisibility.unbind,
});

app.use(router).use(vfmPlugin).mount("#app");
