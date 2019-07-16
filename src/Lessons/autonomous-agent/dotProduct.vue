<template>
  <P5 v-on="{setup,draw}" />
</template>

<script lang="ts">
import P5, { P5Sketch, P5Vector } from "vue-p5-component";
import Vue from "vue";
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface Idata {

}

export default Vue.extend({
  components: { P5 },
  data: () => ({} as Idata),
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth * 0.5, window.innerHeight * 0.5);
    },
    draw(ctx: P5Sketch) {
      ctx.background(100);
      const origin = ctx.createVector(ctx.width * 0.5, ctx.height * 0.5);
      const mouse = ctx.createVector(ctx.mouseX, ctx.mouseY);
      const xAxis = ctx.createVector(1, 0); // (1,0) 1 => setMag 1 X 200
      const yAxis = mouse.sub(origin);
      this.drawVector(ctx, xAxis, origin);
      this.drawVector(ctx, yAxis, origin);
      const angleBetweenVector = ctx.acos(xAxis.dot(yAxis) / (xAxis.mag() * yAxis.mag()));
      const angleBetweenVectorP5 = yAxis.angleBetween(xAxis);
      ctx.text(`
      angleBetweenVectorP5 === angleBetweenVector: ${angleBetweenVectorP5 === angleBetweenVector}
      degrees: ${ctx.degrees(angleBetweenVector)}
      radian: ${angleBetweenVector}
      `, 10, 10);
    },
    drawVector(ctx: P5Sketch, axis: P5Vector, origin: P5Vector) {
      axis.setMag(200);
      ctx.push();
      ctx.translate(origin.x, origin.y);
      ctx.stroke(255);
      ctx.strokeWeight(5);
      ctx.rotate(axis.heading());
      const len = axis.mag();
      ctx.line(0, 0, len, 0);
      ctx.pop();
    },
  },
});
</script>
