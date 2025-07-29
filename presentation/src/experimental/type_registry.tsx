abstract class CanvasNode {
    abstract say_hello(): void;
}

interface RegistrableNodes {
  B: B;
  C: C;
}

class NodeRegistry {
  private store = new Map<keyof RegistrableNodes, Map<string, CanvasNode>>();

  public add<K extends keyof RegistrableNodes>(
    type: K, 
    key: string, 
    instance: RegistrableNodes[K]): void 
  {
    let type_map = this.store.get(type);
    if (!type_map) {
      type_map = new Map();
      this.store.set(type, type_map);
    }
    if (type_map.has(key)) {
      throw new Error(`Duplicate key '${key}' for type '${String(type)}'`);
    }
    type_map.set(key, instance);
  }

  public get<K extends keyof RegistrableNodes>(
    type: K,
    key: string
  ): Optional<RegistrableNodes[K]>
  {
    const type_map = this.store.get(type);
    if (!type_map) 
      return Optional.None();
    const instance = type_map.get(key);
    return instance ? Optional.Some(instance as RegistrableNodes[K]) : Optional.None();
  }
}

const canvas_node_registry = new NodeRegistry();

class B extends CanvasNode {
    constructor(public id: string) { super(); }
    say_hello() { console.log(`Hello from B ${this.id}`); }
    b_method() { console.log(`B-specific method in ${this.id}`); }
}

class C extends CanvasNode {
    constructor(public id: string) { super(); }
    say_hello() { console.log(`Hello from C ${this.id}`); }
    c_method() { console.log(`C-specific method in ${this.id}`); }
}

class D extends CanvasNode {
    constructor(public id: string) { super(); }
    say_hello() { console.log(`Hello from D ${this.id}`); }
    d_method() { console.log(`D-specific method in ${this.id}`); }
}

const b_1 = new B("b1");
const b_2 = new B("b2");
const c_1 = new C("c1");

canvas_node_registry.add("B", "b_1", new B("b1"));
canvas_node_registry.add("B", "b_2", new B("b2"));
canvas_node_registry.add("C", "c_1", new C("c1"));
const b_res = canvas_node_registry.get("B", "b_2");
b_res.expect("Something went wrong").say_hello();

