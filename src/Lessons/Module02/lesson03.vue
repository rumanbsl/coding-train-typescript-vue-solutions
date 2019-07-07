<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p><a :href="url">Acceleration</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import { Vector } from "p5";
import
P5,
{ P5Sketch, P5Vector } from "vue-p5-component";

export default Vue.extend({
  components: { P5 },
  data() {
    interface Idata {
      url: string;
      location?: P5Vector;
      velocity?: P5Vector;
      acceleration?: P5Vector;
    }
    const returnable: Idata = {
      url: "https://www.youtube.com/watch?v=TQ_WZU5s_VA&list=PLRqwX-V7Uu6ZwSmtE13iJBcoI-r4y7iEc&index=5",
      location: undefined,
      velocity: undefined,
      acceleration: undefined,
    };
    return returnable;
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth - 100, window.innerHeight - 100);
      this.location = ctx.createVector(ctx.width * 0.5, ctx.height * 0.5);
      this.velocity = ctx.createVector(0, 0);
      this.acceleration = ctx.createVector(0, 0);
    },
    draw(ctx: P5Sketch) {
      if (this.location) {
        ctx.clear();
        ctx.background(250);
        // this.resetLocation(ctx);
        this.update(ctx);

        ctx.fill(100);
        ctx.ellipse(this.location.x, this.location.y, 20, 20);
      }
    },
    update(ctx: P5Sketch) {
      if (this.location && this.velocity && this.acceleration) {
        const mouse = ctx.createVector(ctx.mouseX, ctx.mouseY);
        mouse.sub(this.location);

        mouse.setMag(1);
        this.acceleration = mouse;
        this.velocity.limit(5);

        this.velocity.add(this.acceleration);
        this.location.add(this.velocity);
      }
    },
    resetLocation(ctx: P5Sketch) {
      if (this.location) {
        if (this.location.x > ctx.width) this.location.x = 0;
        if (this.location.x < 0) this.location.x = ctx.width;
        if (this.location.y > ctx.height) this.location.y = 0;
        if (this.location.y < 0) this.location.y = ctx.height;
      }
    },
  },
});
</script>
