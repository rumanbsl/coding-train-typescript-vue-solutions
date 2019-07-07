<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p>
      <a href="https://www.youtube.com/watch?v=8ZEMLCnn8v0&list=PLRqwX-V7Uu6YVljJvFRCyRM6mmF5wMPeE&index=6">
        Perlin Noise
      </a>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import
P5, { P5Sketch } from "vue-p5-component";

export default Vue.extend({
  components: { P5 },
  data() {
    return { time: 0 };
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth * 0.7, window.innerHeight * 0.7);
    },
    draw(ctx: P5Sketch) {
      this.time = this.time + 0.01;
      let x = ctx.noise(this.time);
      x = ctx.map(x, 0, 1, 0, ctx.width);

      ctx.clear();
      ctx.background(240);
      ctx.fill(105);
      ctx.ellipse(x, ctx.height * 0.5, 10, 10);
    },
  },
});
</script>
