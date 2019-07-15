import { P5Sketch, P5Vector } from "vue-p5-component";
import cloneDeep from "lodash/cloneDeep";
import Mover from "./Vehicle";

/**
 *
 *
 * @export
 * @class Attractor
 */
export default class Attractor{
  private ctx: P5Sketch;

  public position: P5Vector;

  public mass = 50;

  /**
 *Creates an instance of Attractor.
 * @param {P5Sketch} ctx
 * @param {P5Vector} position
 * @memberof Attractor
 */
  public constructor(ctx: P5Sketch) {
    this.ctx = ctx;
    this.position = ctx.createVector(ctx.width * 0.5, ctx.height * 0.5);
  }

  /**
   *
   *
   * @memberof Attractor
   */
  public display() {
    const { ctx, position, mass } = this;
    ctx.push();
    ctx.fill(0);
    ctx.ellipse(position.x, position.y, mass, mass);
    ctx.pop();
  }

  /**
   *
   *
   * @param {Mover} mover
   * @memberof Attractor
   * @returns {P5Vector} Mover acceleration
   */
  public attract(mover: Mover): Mover["acceleration"] {
    const direction = cloneDeep(this.position).sub(mover.position);
    let directionMagSquared = direction.magSq();
    directionMagSquared = this.ctx.constrain(directionMagSquared, 25, 125);
    const G = 1;
    const moverMass = mover.r * 2;
    const magnitutde = (G * this.mass * moverMass) / directionMagSquared;
    direction.normalize();
    direction.mult(magnitutde);
    return direction;
  }
}
