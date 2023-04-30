import {createApp} from "vue";
import {createPinia} from "pinia";
import App from "./App.vue";
import component from "./components";
import taob from "./taob";
import router from "./router";
import rules from "./rules";
import "./tailwind.css";

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(component);
app.use(taob);
app.use(router);
app.use(rules);
app.mount("#app");

export default app;

import("./stores");
