<template>
  <P5 v-on="{setup,draw}" />
</template>

<script lang="ts">
import P5, { P5Sketch, P5Vector } from "vue-p5-component";
import Vue from "vue";
import cloneDeep from "lodash/cloneDeep";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Idata {
  start: P5Vector;
  end: P5Vector;
}

export default Vue.extend({
  components: { P5 },
  data: () => ({ start: undefined, end: undefined } as unknown as Idata),
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth * 0.5, window.innerHeight * 0.5);

      this.start = ctx.createVector(ctx.width * 0.1, ctx.height * 0.5);
      this.end = ctx.createVector(this.start.x + 200, this.start.y);
    },
    draw(ctx: P5Sketch) {
      ctx.background(200);
      const mouse = ctx.createVector(ctx.mouseX, ctx.mouseY);
      const a = cloneDeep(mouse).sub(this.start);
      const b = cloneDeep(this.end).sub(this.start);
      /**
       * Normal way
      */
      // const theta = a.angleBetween(b);
      // b.normalize();
      // b.mult(a.mag() * ctx.cos(theta));

      /**
       * compact way
      */
      b.normalize();
      b.mult(a.dot(b));
      const normalPoint = cloneDeep(this.start).add(b);
      ctx.push();
      ctx.fill(50);
      ctx.ellipse(mouse.x, mouse.y, 10, 10);
      ctx.ellipse(this.start.x, this.start.y, 10, 10);
      ctx.ellipse(this.end.x, this.end.y, 10, 10);
      ctx.stroke(0);
      ctx.line(this.start.x, this.start.y, normalPoint.x, normalPoint.y);
      ctx.line(this.start.x, this.start.y, mouse.x, mouse.y);
      ctx.line(normalPoint.x, normalPoint.y, this.end.x, this.end.y);
      ctx.pop();

      ctx.push();
      ctx.fill(255, 0, 0);
      ctx.ellipse(normalPoint.x, normalPoint.y, 10, 10);
      ctx.stroke(255, 0, 0);
      ctx.line(mouse.x, mouse.y, normalPoint.x, normalPoint.y);
      ctx.pop();
    },
  },
});
</script>
