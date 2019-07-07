<template>
  <div>
    <P5 v-on="{setup, draw}" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import P5, { P5Sketch } from "vue-p5-component";
import Actor from "./Actor";
import Grid from "./Grid";

interface Idata {
  actors: Actor[];
  grid: Grid | undefined;
}

export default Vue.extend({
  components: { P5 },
  data: (): Idata => ({ actors: [], grid: undefined }),
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth, window.innerHeight * 0.4);
      this.grid = new Grid(ctx, 125);
      for (let index = 0; index < 50; index += 1) {
        const vec = ctx.createVector(ctx.random(ctx.width), ctx.random(ctx.height));
        const actor = new Actor(ctx, vec, ctx.random(1, 10), ctx.random(5, 10));
        this.actors.push(actor);
      }
    },
    draw(ctx: P5Sketch) {
      ctx.clear();
      this.actors.forEach((actor) => {
        actor.display();
        actor.flowFieldForce(this.grid as Grid);
      });
    },
  },
});
</script>
