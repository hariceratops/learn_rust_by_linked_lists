import { Entity, Component, ComponentClass, ComponentStore, WorldLike, System } from './types';

export class World implements WorldLike {
  private next_entity_id: Entity = 0;
  private components: Map<Function, ComponentStore> = new Map();
  private systems: System[] = [];

  create_entity(): Entity {
    return this.next_entity_id++;
  }

  add_component<T extends Component>(entity: Entity, component: T): void {
    const ctor = component.constructor as ComponentClass<T>;
    if(!this.components.has(ctor)) {
      this.components.set(ctor, new Map());
    }
    this.components.get(ctor)!.set(entity, component);
  }

  get_component<T extends Component>(entity: Entity, ctor: ComponentClass<T>): T | undefined {
    return this.components.get(ctor)?.get(entity) as T | undefined;
  }

  get_entities_with(...ctors: Function[]): Entity[] {
    if(ctors.length === 0) return [];
    const sets = ctors.map(c => new Set(this.components.get(c)?.keys() ?? []));
    return [...sets.reduce((a,b) => new Set([...a].filter(x => b.has(x))))];
  }

  register_system(system: System): void {
    this.systems.push(system);
  }

  update(): void {
    for(const system of this.systems) {
      system.update(this);
    }
  }
};
