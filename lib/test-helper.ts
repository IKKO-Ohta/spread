import { PerfomanceColor } from '@/models/const/color'

export class TestHelper {
  static readonly LOW = 0.82 // reject area 20%
  static readonly MID = 1.28 // 10%
  static readonly HIGH = 1.65 // 5%
  static readonly p = 0.5

  static execTest(X: number, n: number): PerfomanceColor {
    return this._getResult(this._getZ(X, n, this.p))
  }

  static _getResult(z: number | undefined): PerfomanceColor {
    if (z === undefined) {
      return PerfomanceColor.NOT_REJECT_COLOR
    }

    if (z > this.HIGH) {
      return PerfomanceColor.HIGH_COLOR
    } else if (z > this.MID) {
      return PerfomanceColor.MID_COLOR
    } else if (z > this.LOW) {
      return PerfomanceColor.LOW_COLOR
    } else if (-this.LOW < z && z < this.LOW) {
      return PerfomanceColor.NOT_REJECT_COLOR
    } else if (-this.MID < z && z < -this.LOW) {
      return PerfomanceColor.MINUS_LOW_COLOR
    } else if (-this.HIGH < z && z < -this.MID) {
      return PerfomanceColor.MINUS_MID_COLOR
    } else {
      return PerfomanceColor.MINUS_HIGH_COLOR
    }
  }

  /**
   * map data to standard normal distribution
   */
  static _getZ(X: number, n: number, p: number): number | undefined {
    if (n === 0) {
      return undefined
    }
    const a = X - n * p
    const b = Math.sqrt(n * p * (1 - p))
    return a / b
  }
}
