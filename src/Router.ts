import VueRouter from "vue-router";
// module 1
import M01_Lesson01 from "./Lessons/Module01/lesson01.vue";
import M01_Lesson02 from "./Lessons/Module01/lesson02.vue";
import M01_Lesson03 from "./Lessons/Module01/lesson03.vue";
import M01_Lesson04 from "./Lessons/Module01/lesson04.vue";
import M01_Lesson05 from "./Lessons/Module01/lesson05.vue";
// module 2
import M02_Lesson01 from "./Lessons/Module02/lesson01.vue";
import M02_Lesson02 from "./Lessons/Module02/lesson02.vue";
import M02_Lesson03 from "./Lessons/Module02/lesson03.vue";
// module 3
import M03_Lesson01 from "./Lessons/Module03/lesson01.vue";
import M03_Lesson02 from "./Lessons/Module03/lesson02.vue";
import M03_Lesson03 from "./Lessons/Module03/lesson03.vue";

import M04_Lesson01 from "./Lessons/Module04/lesson01.vue";
import M04_Lesson02 from "./Lessons/Module04/lesson02.vue";
import M04_Lesson03 from "./Lessons/Module04/lesson03.vue";
import M04_Lesson04 from "./Lessons/Module04/lesson04.vue";
// module 5
import M05_Lesson01 from "./Lessons/Module05/lesson01";
import M05_Lesson02 from "./Lessons/Module05/lesson02";

import exercise from "./Lessons/exercise";

const routes = [
  // module 1
  { path: "/", redirect: "/exercise" },
  { path: "/01/01", component: M01_Lesson01 },
  { path: "/01/02", component: M01_Lesson02 },
  { path: "/01/03", component: M01_Lesson03 },
  { path: "/01/04", component: M01_Lesson04 },
  { path: "/01/05", component: M01_Lesson05 },
  // module 2
  { path: "/02/01", component: M02_Lesson01 },
  { path: "/02/02", component: M02_Lesson02 },
  { path: "/02/03", component: M02_Lesson03 },
  // module 3
  { path: "/03/01", component: M03_Lesson01 },
  { path: "/03/02", component: M03_Lesson02 },
  { path: "/03/03", component: M03_Lesson03 },
  // module 4
  { path: "/04/01", component: M04_Lesson01 },
  { path: "/04/02", component: M04_Lesson02 },
  { path: "/04/03", component: M04_Lesson03 },
  { path: "/04/04", component: M04_Lesson04 },
  // module 5
  { path: "/05/01", component: M05_Lesson01 },
  { path: "/05/02", component: M05_Lesson02 },
  // exercise
  { path: "/exercise", component: exercise },
];

const router = new VueRouter({ routes, mode: "history" });

export default router;
