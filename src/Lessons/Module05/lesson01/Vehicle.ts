import { P5Sketch, P5Vector } from "vue-p5-component";
/**
 *
 *
 * @export
 * @class Vehicle
 */
export default class Vehicle{
  private ctx: P5Sketch;

  private position: P5Vector;

  private velocity: P5Vector;

  private acceleration: P5Vector;

  private r: number;

  private maxForce: number;

  private maxSpeed: number;

  /**
   *Creates an instance of Vehicle.
   * @param {P5Sketch} ctx
   * @param {number} x
   * @param {number} y
   * @memberof Vehicle
   */
  public constructor(ctx: P5Sketch, x: number, y: number) {
    this.acceleration = ctx.createVector(0, 0);
    this.velocity = ctx.createVector(0, -2);
    this.position = ctx.createVector(x, y);
    this.r = 6;
    this.maxSpeed = 4;
    this.maxForce = 0.1;
    this.ctx = ctx;
  }

  /**
   *
   *
   * @memberof Vehicle
   */
  public update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  /**
   *
   *
   * @param {P5Vector} force
   * @memberof Vehicle
   */
  public applyForce(force: P5Vector) {
    this.acceleration.add(force);
  }

  /**
   *
   *
   * @param {P5Vector} target
   * @memberof Vehicle
   */
  public seek(target: P5Vector) {
    // steering = desried_velocity - actual_velocity
    const desired_position = target.sub(this.position);
    desired_position.setMag(this.maxSpeed);
    const steer = desired_position.sub(this.velocity);
    steer.limit(this.maxForce);

    this.applyForce(steer);
  }

  /**
   *
   *
   * @param {P5Vector} target
   * @memberof Vehicle
   */
  public arrive(target: P5Vector) {
    const desired_position = target.sub(this.position);
    const magnituteOfDesired = desired_position.mag();

    if (magnituteOfDesired < 100) {
      const expectedMagnitude = this.ctx.map(magnituteOfDesired, 0, 100, 0, this.maxSpeed);
      desired_position.setMag(expectedMagnitude);
    } else {
      desired_position.setMag(this.maxSpeed);
    }

    const steer = desired_position.sub(this.velocity);
    steer.limit(this.maxForce);

    this.applyForce(steer);
  }

  /**
   *
   *
   * @memberof Vehicle
   */
  public display() {
    const { ctx } = this;
    const theta = this.velocity.heading() + (ctx.PI / 2);

    ctx.fill(127);
    ctx.stroke(0);
    ctx.strokeWeight(1);
    ctx.push();
    ctx.translate(this.position.x, this.position.y);
    ctx.rotate(theta);
    ctx.beginShape();
    // mannually creating a box
    ctx.vertex(0, -this.r * 2); // 0, -12
    ctx.vertex(-this.r, this.r * 2); // -6, 12
    ctx.vertex(this.r, this.r * 2); // 6, 12
    ctx.endShape(ctx.CLOSE);
    ctx.pop();
  }
}
