<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p><a :href="url">Pendulum</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import
P5,
{ P5Sketch, P5Vector } from "vue-p5-component";

interface Idata {
  pendulum: {
    origin: P5Vector;
    bob: P5Vector;
    len: number;
    mass: number;
  };
  theta: number;
  velocity: number;
  acceleration: number;
  url: string;
}

export default Vue.extend({
  components: { P5 },
  data() {
    const returnable = {
      url: "https://www.youtube.com/watch?v=9iaEqGOh5WM&list=PLRqwX-V7Uu6bR4BcLjHHTopXItSjRA7yG&index=4",
      theta: 70,
      velocity: 0,
      acceleration: 0,
    } as Idata;
    return returnable;
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth - 100, window.innerHeight - 100);
    },
    draw(ctx: P5Sketch) {
      this.pendulum = this.createPendulum(ctx, this.theta);
      ctx.clear();
      ctx.background(200);
      ctx.stroke(0);
      const { origin, bob } = this.pendulum;
      this.createForce(this.pendulum.mass);
      ctx.line(origin.x, origin.y, bob.x, bob.y);
      ctx.fill(255, 0, 0);
      ctx.ellipse(bob.x, bob.y, this.pendulum.mass, this.pendulum.mass);
    },
    createPendulum(ctx: P5Sketch, theta: number): Idata["pendulum"] {
      const len = ctx.height * 0.4;
      const mass = 40;
      const origin = ctx.createVector(ctx.width * 0.5, 0);
      const bob = this.createBob(ctx, origin, theta, len);
      return {
        len,
        origin,
        bob,
        mass,
      };
    },
    createBob(ctx: P5Sketch, origin: P5Vector, theta: number, len: number): Idata["pendulum"]["bob"] {
      const { x, y } = this.polarToCartisian(theta, len);
      const bob = ctx.createVector(x + origin.x, y + origin.y);
      return bob;
    },
    polarToCartisian(theta: number, radius: number): {x: P5Vector["x"]; y: P5Vector["y"]} {
      return {
        // NOTE: x and y are inversed
        x: Math.sin(theta) * radius,
        y: Math.cos(theta) * radius,
      };
    },
    createForce(massOfObject: number) {
      // pendulum simulation
      const forceOfGravity = -0.1;
      this.acceleration = (Math.sin(this.theta) * forceOfGravity) / massOfObject;
      this.velocity += this.acceleration;
      this.theta += this.velocity;
    },
  },
});
</script>
