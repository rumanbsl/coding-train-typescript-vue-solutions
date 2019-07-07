<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p><a :href="url">Spring</a></p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import P5, { P5Sketch, P5Vector } from "vue-p5-component";

import cloneDeep from "lodash/cloneDeep";

interface Origin {
  location: P5Vector;
}
interface Mover {
  mass: number;
  location: P5Vector;
  acceleration: P5Vector;
  velocity: P5Vector;
}

interface Idata {
  origin: Origin;
  bob: Mover;
  restLength: number;
  url: string;
}

export default Vue.extend({
  components: { P5 },
  data: () => ({
    origin: {},
    bob: {},
    restLength: 0,
    url: "https://www.youtube.com/watch?v=cluKQOY92Dw&list=PLRqwX-V7Uu6bR4BcLjHHTopXItSjRA7yG&index=5",
  } as unknown as Idata),
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
      this.restLength = ctx.height * 0.9;
      this.origin = this.createOrigin(ctx);
      this.bob = this.createMover(ctx, 100);
    },
    draw(ctx: P5Sketch) {
      const springForce = this.springForce({ bounceRate: 0.8 });
      this.applyForce(springForce);

      ctx.background(150);
      ctx.fill(100);
      ctx.line(this.origin.location.x, this.origin.location.y, this.bob.location.x, this.bob.location.y);
      ctx.ellipse(this.bob.location.x, this.bob.location.y, this.bob.mass, this.bob.mass);
    },
    createOrigin(ctx: P5Sketch): Origin {
      const origin: Origin = { location: ctx.createVector(ctx.width * 0.5, 0) };
      return origin;
    },
    createMover(ctx: P5Sketch, mass: Mover["mass"]): Mover {
      const location = ctx.createVector(this.origin.location.x, this.restLength);
      const mover: Mover = {
        mass,
        location,
        acceleration: ctx.createVector(0, 0),
        velocity: ctx.createVector(0, 0),
      };
      return mover;
    },
    springForce({ bounceRate }: {bounceRate: number}): Mover["acceleration"] {
      const spring = cloneDeep(this.bob.location);
      spring.sub(this.origin.location);
      const currentLength = spring.mag();
      spring.normalize();

      const k = 0.2;
      const stretch = currentLength - this.restLength * bounceRate;
      spring.mult(-k * stretch);
      return spring;
    },
    applyForce(FORCE: Mover["acceleration"]) {
      FORCE.div(this.bob.mass);
      this.bob.acceleration.add(FORCE);
      this.bob.velocity.add(this.bob.acceleration);
      this.bob.location.add(this.bob.velocity);
      this.bob.acceleration.mult(0);
    },
  },
});
</script>
