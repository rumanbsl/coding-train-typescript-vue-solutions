<template>
  <div>
    <P5 v-on="{setup, draw}"/>
    <p><a href="https://www.youtube.com/watch?v=nfmV2kuQKwA&list=PLRqwX-V7Uu6Zy51Q-x9tMWIv9cueOFTFA&index=12">random()</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import
P5,
{ P5Element, P5Sketch, P5Graphics } from "vue-p5-component";

export default Vue.extend({
  components: { P5 },
  data() {
    return {
      color: { r: 0, g: 0, b: 0 },
      coord: { x: 0, y: 0 },
    };
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(1024, 768);
      ctx.background(240);
    },
    draw(ctx: P5Sketch) {
      this.color = {
        r: ctx.random(0, 255),
        g: ctx.random(0, 255),
        b: ctx.random(0, 255),
      };
      this.coord = {
        x: ctx.random(0, ctx.width),
        y: ctx.random(0, ctx.height),
      };
      const { r, g, b } = this.color;
      const { x, y } = this.coord;
      ctx.fill(r, g, b, 100);
      ctx.noStroke();
      ctx.ellipse(x, y, 60, 50);
    },
  },
});
</script>
