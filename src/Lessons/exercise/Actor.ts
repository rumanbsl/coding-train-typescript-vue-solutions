import { P5Vector, P5Sketch } from "vue-p5-component";
import { Vector } from "p5";
import Grid from "./Grid";

/**
 *
 *
 * @export
 * @class Actor
 */
export default class Actor{
  public ctx: P5Sketch;

  public position: P5Vector;

  public velocity: P5Vector;

  public acceleration: P5Vector;

  public mass: number;

  public maxForce: number;

  public maxSpeed: number;

  /**
   *Creates an instance of Actor.
   * @param {P5Vector} position
   * @memberof Actor
   */
  public constructor(ctx: P5Sketch, position: P5Vector, maxForce: number, maxSpeed: number) {
    this.ctx = ctx;
    this.position = position;
    this.velocity = ctx.createVector(0, 0);
    this.acceleration = ctx.createVector(0, 0);
    this.maxSpeed = maxSpeed;
    this.maxForce = maxForce;
    this.mass = ctx.random(5, 10);
  }

  /**
   *
   *
   * @memberof Actor
   */
  public display() {
    const { ctx } = this;
    const theta = this.velocity.heading() + 90;
    ctx.push();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(theta);
    ctx.fill(255, 200, 0);
    ctx.beginShape();
    ctx.vertex(0, -this.mass * 2);
    ctx.vertex(-this.mass, this.mass * 2);
    ctx.vertex(this.mass, this.mass * 2);
    ctx.endShape(ctx.CLOSE);
    ctx.pop();
  }

  /**
   *
   *
   * @param {Actor["acceleration"]} force
   * @memberof Actor
   */
  public applyForce(force: Actor["acceleration"]) {
    const acceleration = force.div(this.mass);
    this.acceleration.add(acceleration);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  /**
   *
   *
   * @param {Grid} grid
   * @memberof Actor
   */
  public flowFieldForce(grid: Grid) {
    const desiredVelocity = grid.getPositionOfActor(this.position) as Vector;
    desiredVelocity.setMag(this.maxSpeed);
    const steering = desiredVelocity.sub(this.velocity);
    steering.limit(this.maxForce);
    this.applyForce(steering);
    this.borders();
  }

  /**
   *
   *
   * @memberof Vehicle
   */
  public borders() {
    const { position, ctx, mass } = this;
    if (position.x < -mass) position.x = ctx.width;
    if (position.y < -mass) position.y = ctx.height;
    if (position.x > ctx.width + mass) position.x = mass;
    if (position.y > ctx.height + mass) position.y = mass;
  }
}
