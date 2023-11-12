class Parent {

  public void call() {
    System.out.println("im Parent");
  }
}

class Son extends Parent {// 1.有类继承或者接口实现
  public void call() {// 2.子类要重7写父类的方法
    System.out.println("im Son");
  }
}

class Daughter extends Parent {// 1.有类继承或者接口实现
  public void call() {// 2.子类要重写父类的方法
    System.out.println("im Daughter");
  }
}

public class Polymorphism {

  public static void main(String[] args) {
    Parent p = new Son(); // 3.父类的引用指向子类的对象
    p.call();
    Parent p1 = new Daughter(); // 3.父类的引用指向子类的对象
    p1.call();
  }
}
