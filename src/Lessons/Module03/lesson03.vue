<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p v-for="(url,u) in urls" :key="u">
      <a :href="url.link">{{ url.title }}</a>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import cloneDeep from "lodash/cloneDeep";
// import { Vector } from "p5";
import
P5,
{ P5Sketch, P5Vector } from "vue-p5-component";

interface Attractor {
  location: P5Vector; // where
  mass: number;
  G: number;
  dragOffset: P5Vector;
}

interface Mover {
  location: P5Vector; // where
  velocity: P5Vector; // which direction
  acceleration: P5Vector; // what speed
  mass: number; // what size
}
interface Idata {
  urls: {link: string; title: string}[];
  movers: Mover[];
  attractor: Attractor;
}

export default Vue.extend({
  components: { P5 },
  data() {
    const returnable: Idata = {
      urls: [
        {
          link: "https://www.youtube.com/watch?v=fML1KpvvQTc&list=PLRqwX-V7Uu6ZRrqLcQ5BkBKmBLiGD8n4O&index=6",
          title: "Gravitational attraction",
        },
      ],
      movers: [],
      attractor: {} as Attractor,
    };
    return returnable;
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth - 100, window.innerHeight - 100);
      this.attractor = this.createNewAttractor(ctx);

      for (let index = 0; index < 10; index += 1) {
        const mover = this.createNewMover(ctx);
        this.movers.push(mover);
      }
    },
    draw(ctx: P5Sketch) {
      ctx.clear();
      this.drawAttractor(ctx);
      this.drawMovers(ctx);
    },
    createNewMover(ctx: P5Sketch): Mover {
      const randomXCord = Math.floor(ctx.random(ctx.width * 0.5));
      const randomYCord = Math.floor(ctx.random(ctx.height * 0.5));
      const location = ctx.createVector(randomXCord, randomYCord);
      const velocity = ctx.createVector(0, 0);
      const acceleration = ctx.createVector(0, 0);
      const mass = Math.floor(ctx.random(10, 40));
      return { location, velocity, acceleration, mass };
    },
    createNewAttractor(ctx: P5Sketch): Attractor {
      return {
        mass: 40,
        location: ctx.createVector(ctx.width * 0.5, ctx.height * 0.5),
        G: 1,
        dragOffset: ctx.createVector(0, 0),
      };
    },
    handleTouchEdgeOfCanvas(ctx: P5Sketch, mover: Mover) {
      const originOfMass = mover.mass * 0.5;
      if (mover.location.x + originOfMass > ctx.width) {
        mover.location.x = ctx.width - originOfMass;
        mover.velocity.x *= -1;
      }
      if (mover.location.y + originOfMass > ctx.height) {
        mover.location.y = ctx.height - originOfMass;
        mover.velocity.y *= -1;
      }
      if (mover.location.x + originOfMass < 0) {
        mover.location.x = originOfMass;
        mover.velocity.x *= -1;
      }
      if (mover.location.y + originOfMass < 0) {
        mover.location.y = originOfMass;
        mover.velocity.y *= -1;
      }
    },
    drawAttractor(ctx: P5Sketch) {
      ctx.background(150);
      ctx.ellipseMode(ctx.CENTER);
      ctx.strokeWeight(4);
      ctx.stroke(0);
      ctx.fill(170, 200);
      ctx.ellipse(this.attractor.location.x, this.attractor.location.y, this.attractor.mass, this.attractor.mass);
    },
    drawMovers(ctx: P5Sketch) {
      this.movers.forEach((mover) => {
        const force = this.createForce(ctx, mover);
        mover.acceleration.add(force);
        mover.velocity.add(mover.acceleration);
        mover.location.add(mover.velocity);
        mover.acceleration.mult(0);
        ctx.fill(100);
        ctx.ellipse(
          mover.location.x,
          mover.location.y,
          mover.mass,
          mover.mass,
        );
        this.handleTouchEdgeOfCanvas(ctx, mover);
      });
    },
    createForce(ctx: P5Sketch, mover: Mover): Mover["acceleration"] {
      const force = cloneDeep(this.attractor); // let's not mess the original attractor
      const direction = force.location.sub(mover.location);
      let distance = direction.mag();
      distance = ctx.constrain(distance, 5, 25);
      direction.normalize();
      const magnitude = (force.G * (force.mass * mover.mass)) / (distance * distance);
      let acceleration = direction.mult(magnitude);
      acceleration = force.location.div(mover.mass); // applying newtons second law is fun
      return acceleration;
    },
  },
});
</script>
