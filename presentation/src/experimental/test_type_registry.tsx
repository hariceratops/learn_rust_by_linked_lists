
import { TypeRegistry } from './type_registry'
import { RegisterableType } from './registerable';

abstract class CanvasNode {
  abstract say_hello(): void;
}

class Rect extends CanvasNode {
  constructor(public id: string) { super(); }
  say_hello() { console.log(`Hello from Rect ${this.id}`); }
  rect_method() { console.log(`Rect method ${this.id}`); }
}

class Circle extends CanvasNode {
  constructor(public id: string) { super(); }
  say_hello() { console.log(`Hello from Circle ${this.id}`); }
  circle_method() { console.log(`Circle method in ${this.id}`); }
}

class TextTree extends CanvasNode {
  constructor(public id: string) { super(); }
  say_hello() { console.log(`Hello from TextTree ${this.id}`); }
  text_tree_method() { console.log(`TextTree specific method in ${this.id}`); }
}


interface CanvasNodeRegisterables extends RegisterableType<CanvasNode> {
  Rect: Rect;
  Circle: Circle;
}

const canvas_node_registry = new TypeRegistry<CanvasNode, CanvasNodeRegisterables>();
canvas_node_registry.add("Rect", "rect_1k", new Rect("rect_1k"));
canvas_node_registry.add("Rect", "rect_2p", new Rect("rect_2p"));
canvas_node_registry.add("Circle", "circle_i93", new Circle("circle_i93"));
const b_res = canvas_node_registry.get("Rect", "rect_1k");
b_res.expect("Something went wrong").say_hello();

const c_res = canvas_node_registry.get("Circle", "rect_2p");
c_res.expect("Something went wrong").say_hello();

