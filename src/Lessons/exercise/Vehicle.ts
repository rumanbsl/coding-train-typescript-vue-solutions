import { P5Sketch, P5Vector } from "vue-p5-component";

/**
 *
 *
 * @export
 * @class Vehicle
 */
export default class Vehicle{
  private ctx: P5Sketch;

  public position: P5Vector;

  public velocity: P5Vector;

  public acceleration: P5Vector;

  public mass = 50;

  public maxSpeed = 10;

  public maxForce = 3;

  /**
   *
   * @param ctx
   */
  public constructor(ctx: P5Sketch) {
    this.ctx = ctx;
    this.position = ctx.createVector(0, 0);
    this.velocity = ctx.createVector(1, 1);
    this.acceleration = ctx.createVector(0, 0);
  }

  /**
   *
   *
   * @memberof Vehicle
   */
  public update() {
    const force = this.steeringForce();
    force.limit(this.maxForce);
    const acceleration = this.applyForce(force);
    this.acceleration.add(acceleration);
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  /**
   *
   *
   * @memberof Vehicle
   */
  public applyForce(force: Vehicle["acceleration"]): Vehicle["acceleration"] {
    const acceleration = force.div(this.mass);
    return acceleration;
  }

  /**
   *
   *
   * @private
   * @returns {Vehicle["acceleration"]}
   * @memberof Vehicle
   */
  private steeringForce(): Vehicle["acceleration"] {
    const { ctx } = this;
    const target = ctx.createVector(ctx.mouseX, ctx.mouseY);
    const desired = target.sub(this.position);
    desired.limit(this.maxSpeed);
    desired.setMag(this.maxSpeed);
    return desired.sub(this.velocity);
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
  public init() {
    this.update();
    this.display();
    this.canvasEdgeTouchByMoverHandle();
  }
}
