<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p><a :href="url">Harmonic wave</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import
P5,
{ P5Sketch } from "vue-p5-component";

interface IangularObject {
    amplitutde: number;
    period: number;
    velocity: number;
    acceleration: number;
}

interface Idata {
  url: string;
  angularObject: IangularObject;
}

export default Vue.extend({
  components: { P5 },
  data() {
    const returnable: Idata = {
      url: "https://www.youtube.com/watch?v=znOBmOrtz_M&list=PLRqwX-V7Uu6bR4BcLjHHTopXItSjRA7yG&index=3",
      angularObject: {
        amplitutde: 0,
        period: 0,
        velocity: 0,
        acceleration: 0,
      },
    };
    return returnable;
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth - 100, window.innerHeight - 100);
      this.angularObject = this.createNewPolarCordinate({
        ...this.angularObject,
        amplitutde: (ctx.width * 0.5) - 10,
        period: 200,
      });
    },
    draw(ctx: P5Sketch) {
      ctx.clear();
      ctx.translate(ctx.width * 0.5, ctx.height * 0.5);

      const x = this.harmonicWave(ctx, this.angularObject);
      ctx.stroke(0);
      ctx.line(0, 0, x, 0);
      ctx.fill(255, 0, 0);
      ctx.ellipse(x, 0, 20, 20);
    },
    createNewPolarCordinate({ amplitutde, period }: Idata["angularObject"]): Idata["angularObject"] {
      return { ...this.angularObject, amplitutde, period };
    },
    harmonicWave(ctx: P5Sketch, { amplitutde, period }: IangularObject): number {
      return amplitutde * ctx.sin((ctx.frameCount / period) * ctx.TWO_PI);
    },
  },
});
</script>
