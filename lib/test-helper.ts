export class TestHelper {
  static readonly LOW = 0.82 // reject area 20%
  static readonly MED = 1.28 // 10%
  static readonly HIGH = 1.65 // 5%
  static readonly p = 0.5

  static execTest(X: number, n: number): string {
    return this._getResult(this._getZ(X, n, this.p))
  }

  static _getResult(z: number): string {
    if (z > this.HIGH) {
      return 'deep green'
    } else if (z > this.MED) {
      return 'green'
    } else if (z > this.LOW) {
      return 'light green'
    } else if (-this.LOW < z && z < this.LOW) {
      return ''
    } else if (-this.MED < z && z < -this.LOW) {
      return 'light red'
    } else if (-this.HIGH < z && z < -this.MED) {
      return 'red'
    } else {
      return 'deep red'
    }
  }

  /**
   * map data to standard normal distribution
   */
  static _getZ(X: number, n: number, p: number): number {
    const a = X - n * p
    const b = Math.sqrt(n * p * (1 - p))
    return a / b
  }
}
