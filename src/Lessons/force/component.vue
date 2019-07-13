<template>
  <P5 v-on="{setup,draw}" />
</template>

<script lang="ts">
import P5, { P5Sketch } from "vue-p5-component";
import Vue from "vue";
import Mover, { ForceType } from "./Mover";
import Attractor from "./Attractor";

interface Idata {
  movers: Mover[];
  attractor: Attractor;
}

export default Vue.extend({
  components: { P5 },
  data: () => ({ movers: [], attractor: undefined } as unknown as Idata),
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth * 0.5, window.innerHeight);
      this.attractor = new Attractor(ctx);
      for (let i = 0; i < 20; i += 1) {
        const mover = new Mover(ctx);
        this.movers.push(mover);
      }
    },
    draw(ctx: P5Sketch) {
      ctx.clear();
      ctx.background(250);
      this.attractor.display();
      this.initMovers("gravity", this.attractor);
      ctx.mousePressed = this.mousePressed;
      ctx.mouseMoved = this.mouseMoved;
    },
    mousePressed() {
      this.initMovers("friction");
    },
    mouseMoved() {
      this.initMovers("drag");
    },
    initMovers(forceType?: ForceType, attractor?: Attractor) {
      this.movers.forEach((mover) => {
        mover.init(forceType, attractor);
      });
    },
  },
});

</script>
