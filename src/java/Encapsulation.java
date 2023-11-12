/**
 * 封装
 */
class Rectangle {

  /**
   * 设置矩形的长度和宽度
   */
  public Rectangle(int length, int width) {
    this.length = length;
    this.width = width;
  }

  /**
   * 长度
   */
  private int length;

  /**
   * 宽度
   */
  private int width;

  /**
   * 获得矩形面积
   *
   * @return
   */
  public int area() {
    return this.length * this.width;
  }
}

/**
 * 正方形，继承自矩形
 */
class Square extends Rectangle {

  /**
   * 设置正方形边长
   *
   * @param length
   */
  public Square(int length) {
    super(length, length);
  }
}
