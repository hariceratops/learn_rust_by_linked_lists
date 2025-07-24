export type Entity = number;
export type Component = Record<string, any>;
export type ComponentClass<T extends Component> = new(...args: any[]) => T;
export type ComponentStore = Map<Entity, Component>;


export interface WorldLike {
  get_component<T extends Component>(entity: Entity, ctor: ComponentClass<T>): T | undefined;
  get_entities_with(...ctors: Function[]): Entity[];
}

export interface System {
  update(world: WorldLike): void;
}
