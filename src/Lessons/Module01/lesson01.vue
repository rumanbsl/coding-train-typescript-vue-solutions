<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p><a href="https://www.youtube.com/watch?v=nicMAoW6u1g&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=11">map()</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import
P5,
{ P5Sketch } from "vue-p5-component";

export default Vue.extend({
  components: { P5 },
  data() {
    return { r: 0, g: 0, b: 0 };
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(1024, 768);
    },
    draw(ctx: P5Sketch) {
      ctx.clear();
      this.r = ctx.map(ctx.mouseX, 0, 1024, 0, 255);
      this.g = ctx.map(ctx.mouseX, 0, 1024, 255, 0);
      this.b = ctx.map(ctx.mouseX, 0, 1024, 125, 255);
      ctx.background(this.r, this.g, this.b);
      ctx.fill(this.b, this.g, this.r);
      ctx.noStroke();
      ctx.ellipse(ctx.mouseX, ctx.height * 0.5, 60, 50);
    },
  },
});
</script>
