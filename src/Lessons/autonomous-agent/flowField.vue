<template>
  <P5 v-on="{setup,draw}" />
</template>

<script lang="ts">
import P5, { P5Sketch } from "vue-p5-component";
import Vue from "vue";
import Vehicle from "./Vehicle";
import FlowField from "./Field";

interface Idata {
  vehicles: Vehicle[];
  flowField: FlowField;
}

export default Vue.extend({
  components: { P5 },
  data: () => ({ vehicles: [], flowField: undefined } as unknown as Idata),
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth * 0.5, window.innerHeight * 0.5);
      for (let index = 0; index < 50; index += 1) {
        this.vehicles.push(new Vehicle(ctx));
      }
      this.flowField = new FlowField(ctx);
    },
    draw(ctx: P5Sketch) {
      ctx.clear();
      this.vehicles.forEach((vehicle) => {
        vehicle.init(this.flowField);
      });
    },
  },
});
</script>
