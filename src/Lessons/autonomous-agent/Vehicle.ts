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

  public r = 5;

  public maxSpeed = 15;

  public maxForce = 5;

  /**
   *
   * @param ctx
   */
  public constructor(ctx: P5Sketch) {
    this.ctx = ctx;
    this.position = ctx.createVector(0, 0);
    this.velocity = ctx.createVector(0, 0);
    this.acceleration = ctx.createVector(0, 0);
  }

  /**
   *
   *
   * @memberof Vehicle
   */
  public update() {
    const force = this.steeringForce("arrive");
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
    const mass = this.r * 5;
    const acceleration = force.div(mass);
    return acceleration;
  }

  /**
   *
   *
   * @private
   * @returns {Vehicle["acceleration"]}
   * @memberof Vehicle
   */
  private steeringForce(steerType?: "arrive"|"seek"): Vehicle["acceleration"] {
    const { ctx } = this;
    const target = ctx.createVector(ctx.mouseX, ctx.mouseY);
    const desired = target.sub(this.position);
    const desiredMag = desired.mag();
    if (desiredMag <= 100 && steerType === "arrive") {
      // this will decrease the magnitutude by 100, untill it reaches 0
      const maxSpeed = ctx.map(desiredMag, 0, 100, 0, this.maxSpeed);
      desired.setMag(maxSpeed);
    } else {
      desired.setMag(this.maxSpeed);
    }
    desired.sub(this.velocity);
    desired.limit(this.maxForce);
    return desired;
  }

  /**
   *
   *
   * @memberof Mover
   */
  public display() {
    const { position, ctx, velocity } = this;
    ctx.push();
    ctx.fill(100);
    const theta = velocity.heading() + (ctx.PI + (ctx.PI * 0.5));
    ctx.translate(position.x, position.y);

    ctx.rotate(theta);

    ctx.beginShape();

    ctx.vertex(0, this.r * 2);

    ctx.vertex(this.r, -this.r * 2);

    ctx.vertex(-this.r, -this.r * 2);

    ctx.endShape(ctx.CLOSE);
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
