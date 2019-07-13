import { P5Sketch, P5Vector } from "vue-p5-component";
import cloneDeep from "lodash/cloneDeep";
import Attractor from "./Attractor";

export type ForceType = "friction" | "drag" | "gravity";
export interface Effect { gravity?: number; wind?: number }

/**
 *
 *
 * @export
 * @class Mover
 */
export default class Mover{
  private ctx: P5Sketch;

  public position: P5Vector;

  public velocity: P5Vector;

  public acceleration: P5Vector;

  public mass: number = 20;

  /**
   *
   * @param ctx
   */
  public constructor(ctx: P5Sketch) {
    this.ctx = ctx;
    this.position = ctx.createVector(ctx.random(0, ctx.width - this.mass), ctx.random(this.mass + 20, ctx.height * 0.20));
    this.velocity = ctx.createVector(0, 0);
    this.acceleration = ctx.createVector(0, 0);
  }

  /**
   *
   *
   * @memberof Mover
   */
  public update(forceType?: ForceType, attractor?: Attractor) {
    const acceleration = this.applyForce(forceType, attractor);
    this.acceleration.add(acceleration);
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  /**
   *
   *
   * @memberof Mover
   */
  public applyForce(forceType?: ForceType, attractor?: Attractor): Mover["acceleration"] {
    const force = this.ctx.createVector(0, 0);
    if (forceType) {
      force.mult(0);
      if (forceType !== "gravity") {
        force.add((this[forceType])());
      } else if (forceType === "gravity" && attractor) {
        force.add((this[forceType])(attractor));
      }
    } else {
      force.add(10, 10);
    }
    const acceleration = force.div(this.mass);
    return acceleration;
  }

  /**
 *
 *
 * @returns {P5Vector}
 * @memberof Mover
 */
  public friction(): P5Vector {
    const velocity = cloneDeep(this.velocity);
    velocity.normalize();
    const direction = velocity.mult(-1);
    const coEffOfFriction = 100;
    const NormalForce = 1;
    const magnitude = NormalForce * coEffOfFriction;
    direction.mult(magnitude);
    return direction;
  }

  /**
 *
 *
 * @returns {P5Vector}
 * @memberof Mover
 */
  public drag(): P5Vector {
    const velocity = cloneDeep(this.velocity);
    const velocityMagSquared = velocity.magSq();

    const density = 1;
    const surfaceOfObject = 1;
    const coEffOfDrag = 1;
    const magnitude = -0.5 * velocityMagSquared * coEffOfDrag * density * surfaceOfObject;
    velocity.setMag(magnitude);

    return velocity;
  }

  /**
 *
 *
 * @returns {P5Vector}
 * @memberof Mover
 */
  public gravity(attractor: Attractor): P5Vector {
    const velocity = attractor.attract(this);
    return velocity;
  }

  /**
   *
   *
   * @memberof Mover
   */
  public display() {
    const { position, ctx, mass } = this;
    ctx.push();
    ctx.fill(100);
    ctx.ellipse(position.x, position.y, mass, mass);
    ctx.pop();
  }

  /**
   *
   *
   * @memberof Mover
   */
  public canvasEdgeTouchByMoverHandle() {
    const { position, velocity, ctx } = this;
    if (position.x > ctx.width) {
      position.x = ctx.width - 10;
      velocity.x *= -1; // e.g.: velocity 20, then new velocity 20 * -1
    }
    if (position.x < 0) {
      position.x = 10;
      velocity.x *= -1; // e.g.: velocity -20, then new velocity -20 * -1
    }
    if (position.y > ctx.height) {
      position.y = ctx.height - 10;
      velocity.y *= -1;
    }
    if (position.y < 0) {
      position.y = 10;
      velocity.y *= -1;
    }
  }

  /**
   *
   *
   * @param {ForceType} forceType
   * @memberof Mover
   */
  public init(forceType?: ForceType, attractor?: Attractor) {
    this.update(forceType, attractor);
    this.display();
    this.canvasEdgeTouchByMoverHandle();
  }
}
