<template>
  <div>
    <P5 v-on="{setup, draw}"/>
    <p><a href="https://www.youtube.com/watch?v=8uyR-YU_0dg&list=PLRqwX-V7Uu6YVljJvFRCyRM6mmF5wMPeE&index=4">Gaussian Distribution</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import
P5,
{ P5Element, P5Sketch, P5Graphics } from "vue-p5-component";

export default Vue.extend({
  components: { P5 },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(1024, 768);
    },
    draw(ctx: P5Sketch) {
      ctx.background(240);
      let gausian = ctx.randomGaussian(0, 10);
      gausian *= 10;
      gausian += 100;
      ctx.fill(0);
      // ctx.ellipse(ctx.width * 0.5, ctx.height * 0.5, gausian, gausian);
    },

  },
});
</script>
