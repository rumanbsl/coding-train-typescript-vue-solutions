import { P5Sketch, P5Vector } from "vue-p5-component";
import fill from "lodash/fill";
import cloneDeep from "lodash/cloneDeep";
import Vehicle from "../exercise/Vehicle";

/**
 *
 *
 * @export
 * @class FlowField
 */
export default class FlowField{
  private cols: number;

  private rows: number;

  private cellSize: number = 30;

  private ctx: P5Sketch;

  private flowField: P5Vector[][]

  /**
    *Creates an instance of FlowField.
    * @param {P5Sketch} ctx
    * @memberof FlowField
  */
  public constructor(ctx: P5Sketch) {
    this.cols = Math.floor(ctx.width / this.cellSize);
    this.rows = Math.floor(ctx.height / this.cellSize);
    this.flowField = fill(Array(this.cols), fill(Array(this.rows), ctx.createVector()));
    this.ctx = ctx;
    this.init();
  }

  /**
 *
 *
 * @memberof FlowField
 */
  public init() {
    const { ctx, flowField } = this;
    ctx.noiseSeed(ctx.random(10000));
    // Reseed noise so we get a new flow field every time
    flowField.forEach((cols, xOff) => cols.forEach((_, yOff) => {
      const theta = ctx.map(ctx.noise(xOff, yOff), 0, 1, 0, ctx.TWO_PI);
      // Polar to cartesian coordinate transformation to get x and y components of the vector
      this.flowField[xOff][yOff] = ctx.createVector(ctx.cos(theta), ctx.sin(theta));
    }));
  }

  /**
   *
   *
   * @param {Vehicle} vehicle
   * @memberof FlowField
   */
  public lookup(vehiclePoosition: Vehicle["position"]): P5Vector {
    const x = Math.floor(vehiclePoosition.x / this.cellSize);
    const col = this.ctx.constrain(x, 0, this.cols - 1);
    const y = Math.floor(vehiclePoosition.y / this.cellSize);
    const row = this.ctx.constrain(y, 0, this.rows - 1);
    return cloneDeep(this.flowField[col][row]);
  }
}
