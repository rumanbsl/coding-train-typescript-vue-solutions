<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p v-for="(url, u) in urls" :key="u">
      <a :href="url.link">{{ url.txt }}</a>
    </p>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import P5, { P5Sketch } from "vue-p5-component";
import Vehicle from "./Vehicle";

interface Idata {
  vehcile?: Vehicle;
  urls: {txt: string; link: string}[];
}

export default Vue.extend({
  components: { P5 },
  data: (): Idata => ({
    vehcile: undefined,
    urls: [
      { txt: "Steering(seek)", link: "https://www.youtube.com/watch?v=4zhJlkGQTvU&list=PLRqwX-V7Uu6YHt0dtyf4uiw8tKOxQLvlW&index=2" },
      { txt: "Steering(arrive)", link: "https://www.youtube.com/watch?v=4zhJlkGQTvU&list=PLRqwX-V7Uu6YHt0dtyf4uiw8tKOxQLvlW&index=3" },
    ],
  }),
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth * 0.8, window.innerHeight * 0.8);
      this.vehcile = new Vehicle(ctx, ctx.width * 0.5, ctx.height * 0.5);
    },
    draw(ctx: P5Sketch) {
      if (this.vehcile) {
        ctx.background(250);
        const mouse = ctx.createVector(ctx.mouseX, ctx.mouseY);

        ctx.fill(200);
        ctx.stroke(0);
        ctx.strokeWeight(2);
        ctx.ellipse(mouse.x, mouse.y, 48, 48);

        // Call the appropriate steering behaviors for our agents
        // this.vehcile.seek(mouse);
        this.vehcile.arrive(mouse);
        this.vehcile.update();
        this.vehcile.display();
      }
    },
  },
});
</script>
