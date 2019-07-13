import VueRouter from "vue-router";

import exercise from "./Lessons/exercise";
import force from "@/Lessons/force";

const routes = [
  // module 1
  { path: "/", redirect: "/exercise" },
  { path: "/force", component: force },
  { path: "/exercise", component: exercise },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
