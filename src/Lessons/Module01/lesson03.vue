<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p>
      <a href="https://www.youtube.com/watch?v=rqecAdEGW6I&list=PLRqwX-V7Uu6YVljJvFRCyRM6mmF5wMPeE&index=2">
        Random Walker
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
    return { x: 0, y: 0 };
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth * 0.7, window.innerHeight * 0.7);
      ctx.background(240);

      this.x = ctx.width * 0.5;
      this.y = ctx.height * 0.5;
    },
    draw(ctx: P5Sketch) {
      this.step(ctx);
      this.render(ctx);
    },
    render(ctx: P5Sketch) {
      const randomColor = Math.floor(ctx.random(0, 255));
      ctx.stroke(randomColor, randomColor, randomColor);
      ctx.point(this.x, this.y);
    },
    step(ctx: P5Sketch) {
      const choice = Math.floor(ctx.randomGaussian(0, 1));
      if (choice === -3) {
        this.x += 1;
      } else if (choice === -2) {
        this.x -= 1;
      } else if (choice === -1) {
        this.y += 1;
      } else if (choice === 0) {
        this.y -= 1;
      }
      this.x = ctx.constrain(this.x, 0, ctx.width - 1);
      this.y = ctx.constrain(this.y, 0, ctx.height - 1);
    },
  },
});
</script>
