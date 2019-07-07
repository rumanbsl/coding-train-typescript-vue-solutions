<template>
  <div>
    <P5 v-on="{setup, draw}" />
    <p><a :href="url">Vector Math</a></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import
P5,
{ P5Sketch, P5Vector } from "vue-p5-component";

export default Vue.extend({
  components: { P5 },
  data() {
    interface Idata {
      url: string;
    }
    const returnable: Idata = { url: "https://www.youtube.com/watch?v=s6b1_3bNCxk&list=PLRqwX-V7Uu6ZwSmtE13iJBcoI-r4y7iEc&index=3" };
    return returnable;
  },
  methods: {
    setup(ctx: P5Sketch) {
      ctx.createCanvas(window.innerWidth - 100, window.innerHeight - 100);
    },
    draw(ctx: P5Sketch) {
      ctx.background(250);
      ctx.stroke(0);
      ctx.strokeWeight(5);
      ctx.noFill();

      const center = [ctx.width * 0.5, ctx.height * 0.5];
      ctx.translate(center[0], center[1]);
      ctx.ellipse(0, 0, 4, 4);
      const mouse = ctx.createVector(ctx.mouseX, ctx.mouseY);

      mouse.sub(center);
      const magnitutue = mouse.mag();
      ctx.line(0, 0, mouse.x, mouse.y);

      ctx.rect(0, 0, magnitutue, 20);
    },
  },
});
</script>
