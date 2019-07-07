<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p><a :href="url">PVector</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import
P5,
{ P5Sketch, P5Vector } from "vue-p5-component";

export default Vue.extend({
  components: { P5 },
  data() {
    interface Idata {
      location?: P5Vector;
      velocity?: P5Vector;
      url: string;
    }
    const returnable: Idata = {
      location: undefined,
      velocity: undefined,
      url: "https://www.youtube.com/watch?v=7nTLzLf7jUg&list=PLRqwX-V7Uu6ZwSmtE13iJBcoI-r4y7iEc&index=2",
    };
    return returnable;
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth - 100, window.innerHeight - 100);
      this.location = ctx.createVector(ctx.width * 0.5, ctx.height * 0.5);
      this.velocity = ctx.createVector(2.5, -2);
    },
    draw(ctx: P5Sketch) {
      ctx.background(250);
      this.move();
      this.bounce(ctx);
      this.display(ctx);
    },
    move() {
      if (this.velocity !== undefined && this.location !== undefined) { this.location = this.location.add(this.velocity); }
    },
    bounce(ctx: P5Sketch) {
      // when ball is on the edge of canvas
      if (this.velocity !== undefined && this.location !== undefined) {
        if (this.location.x + 24 > ctx.width || this.location.x - 24 < 0) {
          this.velocity.x = this.velocity.x * -1;
        }
        if (this.location.y + 24 > ctx.height || this.location.y - 24 < 0) {
          this.velocity.y = this.velocity.y * -1;
        }
      }
    },
    display(ctx: P5Sketch) {
      if (this.velocity !== undefined && this.location !== undefined) {
        ctx.stroke(0);
        ctx.strokeWeight(2);
        ctx.fill(127);
        ctx.ellipse(this.location.x, this.location.y, 48, 48);
      }
    },
  },
});
</script>
