import VueRouter from "vue-router";

import exercise from "./Lessons/exercise";
import force from "@/Lessons/force";
import autonomousAgent from "@/Lessons/autonomous-agent";

const routes = [
  // module 1
  { path: "/", redirect: "/exercise" },
  { path: "/force", component: force },
  { path: "/autonomous", component: autonomousAgent },
  { path: "/exercise", component: exercise },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
