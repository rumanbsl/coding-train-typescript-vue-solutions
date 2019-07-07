<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p><a :href="url">Oscillation, Polar co-ordiantion</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import
P5,
{ P5Sketch } from "vue-p5-component";

interface IangularObject {
    theta: number;
    radius: number;
    velocity: number;
    acceleration: number;
  }
interface Idata {
  angularObject: IangularObject;
  url: string;
}

export default Vue.extend({
  components: { P5 },
  data() {
    const returnable: Idata = {
      url: "https://www.youtube.com/watch?v=znOBmOrtz_M&list=PLRqwX-V7Uu6bR4BcLjHHTopXItSjRA7yG&index=1",
      angularObject: {
        theta: 0,
        radius: 0,
        velocity: 0,
        acceleration: 0,
      },
    };
    return returnable;
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth - 100, window.innerHeight - 100);
      this.angularObject = this.createNewPolarCordinate({ ...this.angularObject, theta: 30, radius: 100 });
    },
    draw(ctx: P5Sketch) {
      ctx.clear();
      ctx.translate(ctx.width * 0.5, ctx.height * 0.5);

      this.createForce(ctx);
      const { x, y } = this.polarToCartisian(this.angularObject);
      ctx.stroke(0);
      ctx.line(0, 0, x, y);
      ctx.fill(255, 0, 0);
      ctx.ellipse(x, y, 20, 20);
    },
    createNewPolarCordinate({ radius, theta }: Idata["angularObject"]): Idata["angularObject"] {
      return { ...this.angularObject, radius, theta };
    },
    polarToCartisian({ radius, theta }: Idata["angularObject"]): {y: number;x: number} {
      // opposite = radius * Sin(theta) [radius === hypotenus]
      const opposite = radius * Math.sin(theta);
      // adjusent = radius * Cos(theta) [radius === hypotenus]
      const adjusent = radius * Math.cos(theta);
      return {
        y: opposite,
        x: adjusent,
      };
    },
    createForce(ctx: P5Sketch) {
      this.angularObject.acceleration += 0.01;
      this.angularObject.velocity += this.angularObject.acceleration;
      this.angularObject.velocity = ctx.constrain(this.angularObject.velocity, 0, 0.1);
      // we are applying angular velocity
      this.angularObject.theta += this.angularObject.velocity;
    },
  },
});
</script>
