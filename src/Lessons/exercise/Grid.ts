import { P5Sketch, P5Vector } from "vue-p5-component";
import _fill from "lodash/fill";
import _cloneDeep from "lodash/cloneDeep";
import Actor from "./Actor";
/**
 *
 *
 * @export
 * @class Grid
 */
export default class Grid{
  private ctx: P5Sketch;

  private cellSize: number;

  private cols: number;

  private rows: number;

  private grid: P5Vector[][];

  /**
  *Creates an instance of Grid.
  * @param {P5Sketch} ctx
  * @param {number} cellSize
  * @memberof Grid
  */
  public constructor(ctx: P5Sketch, cellSize: number) {
    this.cols = Math.floor(ctx.width / cellSize);
    this.rows = Math.floor(ctx.height / cellSize);

    this.grid = _fill(Array(this.cols), _fill(Array(this.rows), ctx.createVector()));
    this.cellSize = cellSize;
    this.ctx = ctx;
    this.initilizeMovement();
  }

  /**
   *
   *
   * @param {Actor} actor
   * @memberof Grid
   */
  public initilizeMovement() {
    const { ctx } = this;
    this.grid = this.grid.map(cols => cols.map(() => {
      const theta = ctx.random(ctx.radians(-45), ctx.radians(45));
      return ctx.createVector(ctx.cos(theta), ctx.sin(theta));
    }));
  }

  /**
   *
   *
   * @param {Actor["position"]} actorPosition
   * @returns {Actor["position"]}
   * @memberof Grid
   */
  public getPositionOfActor(actorPosition: Actor["position"]): Actor["position"] | undefined {
    const { ctx } = this;
    const column = Math.floor(ctx.constrain(actorPosition.x / this.cellSize, 0, this.cols - 1));
    const row = Math.floor(ctx.constrain(actorPosition.y / this.cellSize, 0, this.rows - 1));
    return _cloneDeep(this.grid[column][row]);
  }
}
