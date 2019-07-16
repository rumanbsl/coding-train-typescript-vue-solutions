<template>
  <div>
    <input
      ref="slider"
      type="range"
      min="1"
      max="3"
      name="display"
      value="3"
      v-on="{change}"
    >
    <label for="display">{{ display }}</label>
    <FlowField v-if="display === 'flowField'" />
    <DotProduct v-else-if="display === 'dotProduct'" />
    <ScalarProjection v-else-if="display === 'scalarProjection'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import FlowField from "./flowField.vue";
import DotProduct from "./dotProduct.vue";
import ScalarProjection from "./scalarProjection.vue";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Idata {
  display: "flowField" | "dotProduct" | "scalarProjection";
}

export default Vue.extend({
  components: { FlowField, DotProduct, ScalarProjection },
  data: () => ({ display: "scalarProjection" } as Idata),
  methods: {
    change(e: Event) {
      const select = parseInt((e.target as any).value, 10);
      if (select === 1) {
        this.display = "flowField";
      } else if (select === 2) {
        this.display = "dotProduct";
      } else {
        this.display = "scalarProjection";
      }
    },
  },
});
</script>
