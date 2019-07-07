<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p><a :href="url">Force</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
// import { Vector } from "p5";
import
P5,
{ P5Sketch, P5Vector } from "vue-p5-component";

interface Mover {
      location: P5Vector; // where
      velocity: P5Vector; // which direction
      acceleration: P5Vector; // what speed
      mass: number; // what size
    }
    interface Idata {
      url: string;
      movers: Mover[];
    }

export default Vue.extend({
  components: { P5 },
  data() {
    const returnable: Idata = {
      url: "https://www.youtube.com/watch?v=MkXoQVWRDJs&list=PLRqwX-V7Uu6ZRrqLcQ5BkBKmBLiGD8n4O&index=2",
      movers: [],
    };
    return returnable;
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth - 100, (window.innerHeight * 0.5) - 100);

      for (let i = 0; i < 25; i += 1) {
        const mover = this.createNewMover(ctx);
        this.movers.push(mover);
      }
    },
    draw(ctx: P5Sketch) {
      if (this.movers.length > 0) {
        ctx.clear();
        ctx.background(250);

        this.movers.forEach((mover) => {
          this.update(ctx, mover);
          this.handleTouchEdgeOfCanvas(ctx, mover);

          const ballColor = 0;
          const ball = ctx.map(ballColor, 0, 255, ctx.width - Math.floor(mover.location.x), ctx.width);
          ctx.fill(ball, 0, 0);
          ctx.ellipse(mover.location.x, mover.location.y, mover.mass, mover.mass);
        });
      }
    },
    createNewMover(ctx: P5Sketch): Mover {
      const randomXCord = Math.floor(ctx.random(ctx.width * 0.5));
      // const randomYCord = Math.floor(ctx.random(ctx.height * 0.5));
      const location = ctx.createVector(randomXCord, ctx.height * 0.5);
      const velocity = ctx.createVector(0, 0);
      const acceleration = ctx.createVector(0, 0);
      const mass = Math.floor(ctx.random(0, 40));
      return { location, velocity, acceleration, mass };
    },
    update(ctx: P5Sketch, mover: Mover) {
      const gravity = ctx.createVector(0, 0.5);
      gravity.mult(mover.mass);
      this.applyNewtonsSecondLaw(gravity, mover);

      if (ctx.mouseIsPressed) {
        const wind = ctx.createVector(5, 0);
        this.applyNewtonsSecondLaw(wind, mover);
      }

      mover.velocity.add(mover.acceleration);
      mover.location.add(mover.velocity);
      mover.acceleration.mult(0); // resetting acceleration in every update
    },
    applyNewtonsSecondLaw(force: P5Vector, mover: Mover) {
      // newtons second law: speed of movement depends on mass of object simply speaking
      const forceDividedByMass = force.div(mover.mass);
      // accumulation not replace
      mover.acceleration.add(forceDividedByMass); // a != f/m, rather a = {...f/m}
    },
    handleTouchEdgeOfCanvas(ctx: P5Sketch, mover: Mover) {
      if (mover.location.x > ctx.width) {
        mover.location.x = ctx.width - 10;
        mover.velocity.x *= -1; // e.g.: velocity 20, then new velocity 20 * -1
      }
      if (mover.location.x < 0) {
        mover.location.x = 10;
        mover.velocity.x *= -1; // e.g.: velocity -20, then new velocity -20 * -1
      }
      if (mover.location.y > ctx.height) {
        mover.location.y = ctx.height - 10;
        mover.velocity.y *= -1;
      }
      if (mover.location.y < 0) {
        mover.location.y = 10;
        mover.velocity.y *= -1;
      }
    },
  },
});
</script>
