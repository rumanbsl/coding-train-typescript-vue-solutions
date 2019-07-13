<template>
  <P5 v-on="{setup,draw}" />
</template>

<script lang="ts">
import P5, { P5Sketch } from "vue-p5-component";
import Vue from "vue";
import Vehicle from "./Vehicle";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Idata {
  vehicle: Vehicle;
}

export default Vue.extend({
  components: { P5 },
  data: () => ({ vehicle: undefined } as unknown as Idata),
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth * 0.5, window.innerWidth * 0.5);
      this.vehicle = new Vehicle(ctx);
    },
    draw(ctx: P5Sketch) {
      ctx.clear();
      this.vehicle.init();
    },
  },
});
</script>
